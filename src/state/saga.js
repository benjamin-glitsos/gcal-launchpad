import { all, put, takeLatest, call, select } from "redux-saga/effects";
import es6promise from "es6-promise";
import { userActions, historyActions } from "./redux";
import querystring from "querystring";

es6promise.polyfill();

function* getUserSaga() {
    try {
        const username = yield select(state => state.user.username);
        const res = yield fetch(process.env.settings.api + "user/" + username);
        const data = yield res.json();
        yield put(userActions.updateUserSuccess(data));
    } catch (err) {
        console.error(err);
        yield put(userActions.updateUserFailure());
    }
}

function* getHistorySaga() {
    try {
        const username = yield select(state => state.user.username);
        const res = yield fetch(
            [
                process.env.settings.api,
                "history",
                "?",
                querystring.stringify({ username })
            ].join("")
        );
        const data = yield res.json();
        yield put(historyActions.updateHistorySuccess(data));
    } catch (err) {
        console.error(err);
        yield put(historyActions.updateHistoryFailure());
    }
}

function* rootSaga() {
    yield all([
        call(getUserSaga),
        call(getHistorySaga),
        takeLatest(historyActions.updateHistory.type, getHistorySaga),
        takeLatest(userActions.updateUser.type, getUserSaga)
    ]);
}

export default rootSaga;

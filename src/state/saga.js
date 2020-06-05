import { all, put, takeLatest, call, select } from "redux-saga/effects";
import es6promise from "es6-promise";
import { userActions, historyActions, reviewActions } from "./redux";
import querystring from "querystring";

es6promise.polyfill();

function* getUserSaga() {
    try {
        const username = yield select(state => state.user.username);
        const res = yield fetch(process.env.settings.api + "user/" + username);
        const data = yield res.json();
        yield put(userActions.updateSuccess(data));
    } catch (err) {
        console.error(err);
        yield put(userActions.updateFailure());
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
        yield put(historyActions.updateSuccess(data));
    } catch (err) {
        console.error(err);
        yield put(historyActions.updateFailure());
    }
}

function* sendReviewsSaga(ids) {
    try {
        ids.forEach(id => {
            ifValidId(id, () => {
                console.log(id + process.env.settings.codes.review.SEND_SUCCESS);
                console.log(id + process.env.settings.codes.review.SEND_FAILURE);
            });
            yield put(reviewActions.sendSuccess());
        });
    } catch (err) {
        console.error(err);
        yield put(reviewActions.sendFailure());
    }
}

function* sendAllReviewsSaga() {
    yield SendReviewsSaga(Object.keys(this.state));
}

function* rootSaga() {
    yield all([
        call(getUserSaga),
        call(getHistorySaga),
        takeLatest(historyActions.update.type, getHistorySaga),
        takeLatest(userActions.update.type, getUserSaga),
        takeLatest(reviewActions.send.type, sendReviewsSaga),
        takeLatest(reviewActions.sendAll.type, sendAllReviewsSaga)
    ]);
}

export default rootSaga;

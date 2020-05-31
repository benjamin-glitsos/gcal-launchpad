import { all, put, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";
import { getHistoryActions } from "./redux";
import querystring from "querystring";

es6promise.polyfill();

function* getHistorySaga() {
    try {
        const res = yield fetch(
            [
                process.env.settings.api,
                "history",
                querystring.stringify({ username: "default" })
            ].join("")
        );
        const data = yield res.json();
        yield put(getHistoryActions.getHistory(data));
    } catch (err) {
        console.error(err);
    }
}

function* rootSaga() {
    yield all([takeLatest(getHistoryActions.getHistory.type, getHistorySaga)]);
}

export default rootSaga;

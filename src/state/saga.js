import { all, put, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";
import { historyActions } from "./redux";
import querystring from "querystring";

es6promise.polyfill();

function* updateHistorySaga() {
    try {
        const res = yield fetch(
            [
                process.env.settings.api,
                "history",
                "?",
                querystring.stringify({ username: "default" })
            ].join("")
        );
        const data = yield res.json();
        yield put(historyActions.updateHistory(data));
    } catch (err) {
        console.error(err);
    }
}

function* rootSaga() {
    yield all([
        takeLatest(historyActions.updateHistory.type, updateHistorySaga)
    ]);
}

export default rootSaga;

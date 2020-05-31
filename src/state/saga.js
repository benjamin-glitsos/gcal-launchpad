import { all, put, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";
import { getHistoryActions } from "./redux";

es6promise.polyfill();

function* getHistorySaga() {
    try {
        const res = yield fetch(process.env.settings.api + "history");
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

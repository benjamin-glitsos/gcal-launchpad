import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";

import { actionTypes, failure, getHistorySuccess } from "./actions";

es6promise.polyfill();

function* getHistorySaga() {
    try {
        const res = yield fetch(process.env.settings.api + "history");
        const data = yield res.json();
        yield put(getHistorySuccess(data));
    } catch (err) {
        yield put(failure(err));
    }
}

function* rootSaga() {
    yield all([takeLatest(actionTypes.GET_HISTORY, getHistorySaga)]);
}

export default rootSaga;

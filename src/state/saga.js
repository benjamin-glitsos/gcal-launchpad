import { all, call, delay, put, take, takeLatest } from "redux-saga/effects";
import es6promise from "es6-promise";

import { actionTypes, getHistory } from "./actions";

es6promise.polyfill();

function* getHistorySaga() {
    try {
        const res = yield fetch(process.env.settings.api + "history");
        const data = yield res.json();
        yield put(getHistory(data));
    } catch (err) {
        console.error(err);
    }
}

function* rootSaga() {
    yield all([takeLatest(actionTypes.GET_HISTORY, getHistorySaga)]);
}

export default rootSaga;

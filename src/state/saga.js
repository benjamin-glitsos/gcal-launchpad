import { all, put, takeLatest, call } from "redux-saga/effects";
import es6promise from "es6-promise";
import { history, review } from "./redux";
import { fetchApi } from "~/lib/database";

es6promise.polyfill();

function* getHistorySaga() {
    try {
        const res = yield fetchApi(["db", "history"], {});
        const data = yield res.json();
        yield put(history.actions.updateSuccess(data));
    } catch (err) {
        console.error(err);
        yield put(history.actions.updateFailure());
    }
}

function* sendReviewsSaga({ payload: [{ id, title, date }] }) {
    try {
        const res = yield fetchApi(["gcal", "create-event"], {
            title,
            date
        });
        const data = yield res.json();
        yield put(review.actions.sendSuccess(id));
    } catch (err) {
        console.error(err);
        yield put(review.actions.sendFailure(id));
    }
}

function* rootSaga() {
    yield all([
        call(getHistorySaga),
        takeLatest(history.actions.update.type, getHistorySaga),
        takeLatest(review.actions.send.type, sendReviewsSaga)
    ]);
}

export default rootSaga;

import { all, put, takeLatest, call, select } from "redux-saga/effects";
import es6promise from "es6-promise";
import { history, input, review } from "./redux";
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

function* sendReviewsSaga(ids) {
    try {
        // ids.forEach(id => {
        //     ifValidId(id, () => {
        //         console.log(id + "send success");
        //     });
        //     yield put(review.actions.sendSuccess());
        //     // Then yield delay of a few seconds.
        //    //  Then yield delete that item from the review pane
        // });
    } catch (err) {
        console.error(err);
        yield put(review.actions.sendFailure());
    }
}

function* sendAllReviewsSaga() {
    // yield SendReviewsSaga(Object.keys(this.state));
}

function* rootSaga() {
    yield all([
        call(getHistorySaga),
        takeLatest(history.actions.update.type, getHistorySaga)
        // takeLatest(review.actions.send.type, sendReviewsSaga),
        // takeLatest(review.actions.sendAll.type, sendAllReviewsSaga)
    ]);
}

export default rootSaga;

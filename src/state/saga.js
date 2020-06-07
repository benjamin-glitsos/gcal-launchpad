import { all, put, takeLatest, call, select } from "redux-saga/effects";
import es6promise from "es6-promise";
import { user, history, review } from "./redux";
import querystring from "querystring";

es6promise.polyfill();

function* getUserSaga() {
    try {
        const username = yield select(state => state.user.username);
        const res = yield fetch(process.env.settings.api + "user/" + username);
        const data = yield res.json();
        yield put(user.actions.updateSuccess(data));
    } catch (err) {
        console.error(err);
        yield put(user.actions.updateFailure());
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
        call(getUserSaga),
        call(getHistorySaga),
        takeLatest(history.actions.update.type, getHistorySaga),
        takeLatest(user.actions.update.type, getUserSaga),
        takeLatest(review.actions.send.type, sendReviewsSaga),
        takeLatest(review.actions.sendAll.type, sendAllReviewsSaga)
    ]);
}

export default rootSaga;

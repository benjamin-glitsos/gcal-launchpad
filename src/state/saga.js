import { all, put, takeLatest, call, delay } from "redux-saga/effects";
import es6promise from "es6-promise";
import { history, review } from "./redux";
import { fetchApi } from "~/lib/database";

es6promise.polyfill();

function* getHistory({ payload }) {
    try {
        console.log(payload);
        const length = 10;
        const res = yield fetchApi(["db", "history"], { length });
        const data = yield res.json();
        yield put(history.actions.updateSuccess(data));
    } catch (err) {
        console.error(err);
        yield put(history.actions.updateFailure());
    }
}

function* addHistory({ payload: [input] }) {
    try {
        console.log(input);
        const res = yield fetchApi(["db", "history", "add"], { input });
        yield put(history.actions.addSuccess(input));
    } catch (err) {
        console.error(err);
        yield put(history.actions.addFailure());
    }
}

function* sendReviews({ payload: [{ id, title, days }] }) {
    try {
        const ress = yield all(
            days.map(({ date }) =>
                call(function* () {
                    yield fetchApi(["gcal", "create-event"], {
                        title,
                        date
                    });
                })
            )
        );
        yield put(review.actions.sendSuccess(id));
        yield delay(process.env.settings.deletionDelay);
        yield put(review.actions.delete([id]));
    } catch (err) {
        console.error(err);
        yield put(review.actions.sendFailure(id));
    }
}

function* rootSaga() {
    yield all([
        call(getHistory, 10),
        takeLatest(history.actions.update.type, getHistory),
        takeLatest(history.actions.add.type, addHistory),
        takeLatest(review.actions.send.type, sendReviews)
    ]);
}

export default rootSaga;

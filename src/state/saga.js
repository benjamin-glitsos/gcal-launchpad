import { all, put, takeLatest, call, delay, select } from "redux-saga/effects";
import es6promise from "es6-promise";
import { history, review } from "./redux";
import { fetchApi } from "~/lib/database";
import { fromEntries } from "~/lib/polyfills";

es6promise.polyfill();

function* updateHistorySaga({ payload: [length] }) {
    try {
        const res = yield fetchApi(["db", "history"], { length });
        const data = yield res.json();
        yield put(history.actions.updateSuccess(data));
    } catch (err) {
        console.error(err);
        yield put(history.actions.updateFailure());
    }
}

function* addHistorySaga({ payload: [input] }) {
    try {
        yield fetchApi(["db", "history", "add"], { input });
        yield put(history.actions.addSuccess());
    } catch (err) {
        console.error(err);
        yield put(history.actions.addFailure());
    }
}

function* sendReviewsSaga({ payload: [{ id, input, title, days }] }) {
    try {
        yield all(
            days.forEach(({ date }) =>
                call(function* () {
                    yield fetchApi(["gcal", "create-event"], {
                        title,
                        date
                    });
                })
            )
        );
        yield call(addHistorySaga, {
            payload: [input]
        });
        yield call(updateHistorySaga, {
            payload: [process.env.settings.historyListLength]
        });
        yield delay(process.env.settings.deletionDelay);
        yield put(review.actions.delete(id));
        yield put(review.actions.sendSuccess(id));
    } catch (err) {
        console.error(err);
        yield put(review.actions.sendFailure(id));
    }
}

function* sendMultipleReviewsSaga({ payload: [events] }) {
    try {
        yield all(
            events.forEach(event => call(sendReviewsSaga, { payload: [event] }))
        );
        yield put(review.actions.sendMultipleSuccess());
    } catch (err) {
        console.error(err);
        yield put(review.actions.sendMultipleFailure());
    }
}

function* rootSaga() {
    yield all([
        call(updateHistorySaga, {
            payload: [process.env.settings.historyListLength]
        }),
        takeLatest(history.actions.update.type, updateHistorySaga),
        takeLatest(history.actions.add.type, addHistorySaga),
        takeLatest(review.actions.send.type, sendReviewsSaga),
        takeLatest(review.actions.sendMultiple.type, sendMultipleReviewsSaga)
    ]);
}

export default rootSaga;

import {
    all,
    put,
    takeLatest,
    call,
    delay,
    select,
    spawn
} from "redux-saga/effects";
import es6promise from "es6-promise";
import Cookies from "universal-cookie";
import { history, input, review, info } from "./redux";
import { fetchApi } from "~/lib/database";
import { fromEntries } from "~/lib/polyfills";

es6promise.polyfill();

const cookies = new Cookies();

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

function* deleteSaga({ payload: [id] }) {
    yield spawn(function* () {
        try {
            const deletionDelaySeconds =
                process.env.settings.deletionDelaySeconds;
            for (let i = 0; i < deletionDelaySeconds; i++) {
                yield delay(1000);
                yield put(review.actions.decrementCountdown(id));
                const event = yield select(review.selectors.item(id));
                if (event.status !== process.env.messages.DELETED) {
                    yield put(review.actions.restoreDeleted(id));
                    break;
                } else if (i + 1 === deletionDelaySeconds) {
                    yield put(review.actions.delete(id));
                }
            }
            yield put(review.actions.toDeleteSuccess());
        } catch (err) {
            console.error(err);
            yield put(review.actions.toDeleteFailure(id));
        }
    });
}

function* deleteMultipleSaga({ payload: [ids] }) {
    try {
        yield all(
            ids.map(id =>
                call(deleteSaga, {
                    payload: [id]
                })
            )
        );
        yield put(review.actions.toDeleteMultipleSuccess());
    } catch (err) {
        console.error(err);
        yield put(review.actions.toDeleteMultipleFailure());
    }
}

function* sendReviewsSaga({ payload: [{ id, input, title, days }] }) {
    try {
        yield all(
            days.map(({ date: { international: date } }) =>
                call(function* () {
                    yield fetchApi(["gcal", "create-event"], {
                        title,
                        date
                    });
                })
            )
        );
        yield put(review.actions.sendSuccess(id));
        yield delay(process.env.settings.deletionDelaySeconds * 1000);
        yield put(review.actions.delete(id));
        console.log(
            "Updating history database table is disabled until a UX improvement is made to this feature."
        );
        // yield call(addHistorySaga, {
        //     payload: [input]
        // });
        // yield call(updateHistorySaga, {
        //     payload: [process.env.settings.historyListLength]
        // });
    } catch (err) {
        console.error(err);
        yield put(review.actions.sendFailure(id));
    }
}

function* sendMultipleReviewsSaga({ payload: [events] }) {
    try {
        yield all(
            events.map(event => call(sendReviewsSaga, { payload: [event] }))
        );
        yield put(review.actions.sendMultipleSuccess());
    } catch (err) {
        console.error(err);
        yield put(review.actions.sendMultipleFailure());
    }
}

function* infoSaga() {
    try {
        if (cookies.get(process.env.cookies.INFO_SHOW) !== "yes") {
            yield put(info.actions.show());
            yield cookies.set(process.env.cookies.INFO_SHOW, "yes");
        }
        yield put(info.actions.infoSuccess());
    } catch (err) {
        console.error(err);
        yield put(info.actions.infoFailure());
    }
}

function* rootSaga() {
    yield all([
        call(infoSaga),
        call(updateHistorySaga, {
            payload: [process.env.settings.historyListLength]
        }),
        takeLatest(history.actions.update.type, updateHistorySaga),
        takeLatest(history.actions.add.type, addHistorySaga),
        takeLatest(review.actions.toDelete.type, deleteSaga),
        takeLatest(review.actions.toDeleteMultiple.type, deleteMultipleSaga),
        takeLatest(review.actions.send.type, sendReviewsSaga),
        takeLatest(review.actions.sendMultiple.type, sendMultipleReviewsSaga),
        takeLatest(info.actions.info.type, infoSaga)
    ]);
}

export default rootSaga;

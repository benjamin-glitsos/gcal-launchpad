import { combineReducers } from "redux";
import { useSelector } from "react-redux";
import { createUpdater } from "redux-lightweight";
import produce from "immer";
import parser from "~/lib/parser";

export const [userReducer, userActions] = createUpdater(
    class User {
        state = {
            username: "default_user",
            app_id: "TEST",
            time_zone: "Australia/Sydney"
        };

        update() {
            return this.state;
        }

        updateSuccess(data) {
            return data[0];
        }

        updateFailure() {
            return this.state;
        }
    }
);

export const [inputReducer, inputActions] = createUpdater(
    class Input {
        empty = "";

        state = this.empty;

        update(data) {
            return data;
        }

        clear(data) {
            return this.empty;
        }
    }
);

export const [reviewReducer, reviewActions] = createUpdater(
    class Review {
        codes = {
            EMPTY: "EMPTY",
            REVIEW: "REVIEW",
            SEND_SUCCESS: "SEND_SUCCESS",
            SEND_FAILURE: "SEND_FAILURE"
        };

        empty = { new: { title: "", days: [], status: this.codes.EMPTY } };

        state = this.empty;

        *createId() {
            var index = 0;
            while (true) {
                yield index++;
            }
        }

        id = this.createId();

        parse(s, timeZone) {
            return produce(this.state, draft => {
                draft.new = {
                    ...parser(s, { timeZone }),
                    status: this.codes.REVIEW
                };
            });
        }

        enter() {
            return produce(this.state, draft => {
                draft.new = this.empty;
                draft[this.id.next().value] = this.state.new;
            });
        }

        clear() {
            return this.empty;
        }
    }
);

export const [historyReducer, historyActions] = createUpdater(
    class History {
        state = [];

        update() {
            return this.state;
        }

        updateSuccess(data) {
            return data;
        }

        updateFailure(err) {
            return this.state;
        }
    }
);

export const rootReducer = combineReducers({
    user: userReducer,
    input: inputReducer,
    review: reviewReducer,
    history: historyReducer
});

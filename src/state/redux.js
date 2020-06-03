import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";
import parser from "~/lib/parser";

export const [userReducer, userActions] = createUpdater(
    class User {
        state = {
            username: "default_user"
        };

        updateUser() {
            return this.state;
        }

        updateUserSuccess({ username, app_id }) {
            return {
                username,
                app_id
            };
        }

        updateUserFailure() {
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
        empty = [{}];

        state = this.empty;

        parse(s) {
            return [parser(s)].concat(this.state.slice(1));
        }

        enter() {
            if (Object.keys(this.state[0]).length > 0) {
                return this.empty.concat(this.state);
            } else {
                return this.state;
            }
        }

        clear() {
            return this.empty;
        }
    }
);

export const [historyReducer, historyActions] = createUpdater(
    class History {
        state = [];

        updateHistory() {
            return this.state;
        }

        updateHistorySuccess(data) {
            return data;
        }

        updateHistoryFailure(err) {
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

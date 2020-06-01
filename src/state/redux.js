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
        state = "";

        updateInput(data) {
            return data;
        }

        clearInput(data) {
            return this.state;
        }
    }
);

export const [reviewReducer, reviewActions] = createUpdater(
    class Review {
        // state = [];
        state = null;

        parseEvents(s) {
            return parser(s);
        }

        clearReview(data) {
            return this.state;
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

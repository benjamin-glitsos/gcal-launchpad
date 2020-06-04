import { combineReducers } from "redux";
import { useSelector } from "react-redux";
import { createUpdater } from "redux-lightweight";
import produce from "immer";
import parser from "~/lib/parser";

export const [userReducer, userActions] = createUpdater(
    class User {
        state = {
            username: "default_user"
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
        empty = [{}];

        state = this.empty;

        parse(s, timeZone) {
            return [parser(s, { timeZone })].concat(this.state.slice(1));
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

import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";

export const [inputReducer, inputActions] = createUpdater(
    class Input {
        state = "";

        updateInput(data) {
            return data;
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
    input: inputReducer,
    history: historyReducer
});

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

        updateHistory(data) {
            return data;
        }
    }
);

export const rootReducer = combineReducers({
    input: inputReducer,
    history: historyReducer
});

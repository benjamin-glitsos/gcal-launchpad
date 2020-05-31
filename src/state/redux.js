import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";

export const [updateInputReducer, updateInputActions] = createUpdater(
    class Input {
        state = "";

        updateInput(data) {
            return data;
        }
    }
);

export const [getHistoryReducer, getHistoryActions] = createUpdater(
    class History {
        state = [];

        getHistory(data) {
            return data;
        }
    }
);

export const rootReducer = combineReducers({
    input: updateInputReducer,
    history: getHistoryReducer
});

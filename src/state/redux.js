import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";

export class Input {
    state = "";

    updateInput(data) {
        return data;
    }
}

export const [updateInputReducer, updateInputActions] = createUpdater(
    Input
);

export class History {
    state = [];

    getHistory(data) {
        return data;
    }
}

export const [getHistoryReducer, getHistoryActions] = createUpdater(History);

export const rootReducer = combineReducers({
    input: updateInputReducer,
    history: getHistoryReducer
});

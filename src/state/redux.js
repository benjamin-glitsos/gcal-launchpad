import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";

export class UpdateInput {
    state = "";

    updateInput(data) {
        return {
            ...this.state,
            ...{ input: data }
        };
    }
}

export const [updateInputReducer, updateInputActions] = createUpdater(
    UpdateInput
);

export class GetHistory {
    state = [];

    getHistory(data) {
        return {
            ...this.state,
            ...{ history: data }
        };
    }
}

export const [getHistoryReducer, getHistoryActions] = createUpdater(GetHistory);

export const rootReducer = combineReducers({
    updateInputReducer,
    getHistoryReducer
});

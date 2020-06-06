import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";
import user from "./user";
import input from "./input";
import review from "./review";
import history from "./history";

const all = [user, input, review, history];

export const [actions, reducers] = all.map(factory => createUpdater(factory));

export const rootReducer = combineReducers({
    user: user.reducer,
    input: input.reducer,
    review: review.reducer,
    history: history.reducer
});

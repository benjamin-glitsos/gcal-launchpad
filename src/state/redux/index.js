import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";
import User from "./user";
import Input from "./input";
import Review from "./review";
import History from "./history";
// TODO: use import glob for webpack?

export const redux = Object.entities({
    user: User,
    input: Input,
    review: Review,
    history: History
}).map([name, factory] => {
    const [actions, reducers] = createUpdater(factory);
    return {
        [name]: {
        actions,
        reducers
        factory
    }
    }
});

// TODO: use a function for mapping over objects?

export const rootReducer = combineReducers(redux.map(x => x.reducers));

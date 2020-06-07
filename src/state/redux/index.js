import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";
import factories from "./factories/*.js";

export const redux = 

const redux = Object.entities({
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

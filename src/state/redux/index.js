import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";
import updaterModules from "./updaters/*.js";
import { uncapitalise } from "~/lib/utilities";
import { fromEntries } from "~/lib/polyfills";

const updaters = updaterModules.map(module => {
    const updater = module.default;
    const [reducer, actions] = createUpdater(updater);
    return [updater.title, { reducer, actions, updater }];
});

export const { history, input, review, user } = fromEntries(updaters);

export const rootReducer = combineReducers(
    fromEntries(updaters.map(([name, values]) => [name, values.reducer]))
);

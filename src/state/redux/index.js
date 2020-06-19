import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";
import updaterModules from "./updaters/*.js";
import { uncapitalise } from "~/lib/utilities";
import { fromEntries } from "~/lib/polyfills";

const updaters = updaterModules.map(module => {
    const updater = module.default;
    const title = updater.title;
    const selectors = updater.selectors;
    const [reducer, actions] = createUpdater(updater);
    return [title, { selectors, reducer, actions }];
});

export const { popup, input, review, history } = fromEntries(updaters);

export const rootReducer = combineReducers(
    fromEntries(updaters.map(([name, values]) => [name, values.reducer]))
);

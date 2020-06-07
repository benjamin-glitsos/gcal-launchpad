import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";
import updaterModules from "./updaters/*.js";
import { uncapitalise, objectMap } from "~/lib/utilities";

const updaters = Object.fromEntries(
    updaterModules.map(module => {
        const updater = module.default;
        return [uncapitalise(updater.name), updater];
    })
);

const redux = objectMap(updaters, updater => {
    const [reducer, actions] = createUpdater(updater);
    return { reducer, actions, updater };
});

export const { history, input, review, user } = redux;

export const rootReducer = combineReducers(objectMap(redux, x => x.reducer));

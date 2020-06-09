import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";
import updaterModules from "./updaters/*.js";
import { uncapitalise, objectMap } from "~/lib/utilities";


function fromEntries (iterable) {
	return [...iterable].reduce((obj, [key, val]) => {
		obj[key] = val
			return obj
	}, {})
}

const updaters = fromEntries(
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

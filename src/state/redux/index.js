import { combineReducers } from "redux";
import { createUpdater } from "redux-lightweight";
import factoryModules from "./factories/*.js";
import { uncapitalise, objectMap } from "~/lib/utilities";

const factories = Object.fromEntries(
    factoryModules.map(module => {
        const factory = module.default;
        return [uncapitalise(factory.name), factory];
    })
);

export const redux = objectMap(factories, factory => {
    const [reducer, actions] = createUpdater(factory);
    return { reducer, actions, factory };
});

export const rootReducer = combineReducers(objectMap(redux, x => x.reducer));

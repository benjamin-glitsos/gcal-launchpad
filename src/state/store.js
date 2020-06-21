import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { createWrapper } from "next-redux-wrapper";
import { rootReducer } from "./redux";
import rootSaga from "./saga";

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== "production") {
        const { composeWithDevTools } = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

export const makeStore = (context, ssrState) => {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        rootReducer,
        {},
        bindMiddleware([sagaMiddleware])
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

export const wrapper = createWrapper(makeStore, {
    debug: process.env.REDUX_DEBUG_MODE === "yes"
});

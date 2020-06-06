import { combineReducers } from "redux";
import { userReducer } from "./user";
import { inputReducer } from "./input";
import { reviewReducer } from "./review";
import { historyReducer } from "./history";

export const rootReducer = combineReducers({
    user: userReducer,
    input: inputReducer,
    review: reviewReducer,
    history: historyReducer
});

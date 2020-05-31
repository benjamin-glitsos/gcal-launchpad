import { actionTypes } from "./actions";

export const initialState = {
    input: "",
    error: false,
    history: null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "__NEXT_REDUX_WRAPPER_HYDRATE__": {
            return { ...state, ...action.payload };
        }

        case actionTypes.FAILURE:
            return {
                ...state,
                ...{ error: action.error }
            };

        case actionTypes.UPDATE_INPUT:
            return {
                ...state,
                ...{ input: action.data }
            };

        case actionTypes.GET_HISTORY_SUCCESS:
            return {
                ...state,
                ...{ history: action.data }
            };

        default:
            return state;
    }
}

export default reducer;

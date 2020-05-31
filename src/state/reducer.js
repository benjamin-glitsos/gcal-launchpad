import { actionTypes } from "./actions";

export const initialState = {
    input: "",
    history: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "__NEXT_REDUX_WRAPPER_HYDRATE__": {
            return { ...state, ...action.payload };
        }

        case actionTypes.UPDATE_INPUT:
            return {
                ...state,
                ...{ input: action.data }
            };

        case actionTypes.GET_HISTORY:
            return {
                ...state,
                ...{ history: action.data }
            };

        default:
            return state;
    }
}

export default reducer;

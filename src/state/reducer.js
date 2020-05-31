import { actionTypes } from "./actions";

export const exampleInitialState = {
    count: 0,
    error: false,
    lastUpdate: 0,
    placeholderData: null
};

function reducer(state = exampleInitialState, action) {
    switch (action.type) {
        case "__NEXT_REDUX_WRAPPER_HYDRATE__": {
            return { ...state, ...action.payload };
        }

        case actionTypes.FAILURE:
            return {
                ...state,
                ...{ error: action.error }
            };

        case actionTypes.INCREMENT:
            return {
                ...state,
                ...{ count: state.count + 1 }
            };

        case actionTypes.DECREMENT:
            return {
                ...state,
                ...{ count: state.count - 1 }
            };

        case actionTypes.RESET:
            return {
                ...state,
                ...{ count: exampleInitialState.count }
            };

        case actionTypes.LOAD_DATA_SUCCESS:
            return {
                ...state,
                ...{ placeholderData: action.data }
            };

        default:
            return state;
    }
}

export default reducer;

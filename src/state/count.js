// Default State --------------------

const countInitialState = {
    count: 0
};

// Actions --------------------

export const countActionTypes = {
    ADD: "ADD"
};

export const addCount = () => dispatch => {
    return dispatch({ type: countActionTypes.ADD });
};

// Reducer --------------------

export default function reducer(state = countInitialState, action) {
    switch (action.type) {
        case countActionTypes.ADD:
            return Object.assign({}, state, {
                count: state.count + 1
            });
        default:
            return state;
    }
}

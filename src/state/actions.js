export const actionTypes = {
    FAILURE: "FAILURE",
    INCREMENT: "INCREMENT",
    DECREMENT: "DECREMENT",
    UPDATE_INPUT: "UPDATE_INPUT",
    RESET: "RESET",
    LOAD_DATA: "LOAD_DATA",
    LOAD_DATA_SUCCESS: "LOAD_DATA_SUCCESS",
    HYDRATE: "HYDRATE"
};

export function failure(error) {
    return {
        type: actionTypes.FAILURE,
        error
    };
}

export function increment() {
    return { type: actionTypes.INCREMENT };
}

export function decrement() {
    return { type: actionTypes.DECREMENT };
}

export function updateInput(data) {
    return { type: actionTypes.UPDATE_INPUT, data };
}

export function reset() {
    return { type: actionTypes.RESET };
}

export function loadData() {
    return { type: actionTypes.LOAD_DATA };
}

export function loadDataSuccess(data) {
    return {
        type: actionTypes.LOAD_DATA_SUCCESS,
        data
    };
}

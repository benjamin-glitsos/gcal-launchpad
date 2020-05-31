export const actionTypes = {
    FAILURE: "FAILURE",
    UPDATE_INPUT: "UPDATE_INPUT",
    GET_HISTORY: "GET_HISTORY",
    GET_HISTORY_SUCCESS: "GET_HISTORY_SUCCESS",
    HYDRATE: "HYDRATE"
};

export function failure(error) {
    return {
        type: actionTypes.FAILURE,
        error
    };
}

export function updateInput(data) {
    return { type: actionTypes.UPDATE_INPUT, data };
}

export function getHistory() {
    return { type: actionTypes.GET_HISTORY };
}

export function getHistorySuccess(data) {
    return {
        type: actionTypes.GET_HISTORY_SUCCESS,
        data
    };
}

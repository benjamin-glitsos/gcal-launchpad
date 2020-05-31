export const actionTypes = {
    UPDATE_INPUT: "UPDATE_INPUT",
    GET_HISTORY: "GET_HISTORY",
    HYDRATE: "HYDRATE"
};

export function updateInput(data) {
    return { type: actionTypes.UPDATE_INPUT, data };
}

export function updateHistory(data) {
    return { type: actionTypes.GET_HISTORY, data };
}

import { createUpdater } from "redux-lightweight";

export class UpdateInput {
    state = "";

    updateInput(data) {
        return {
            ...this.state,
            ...{ input: data }
        };
    }
}

export const [updateInputReducer, updateInputActions] = createUpdater(
    UpdateInput
);

counterReducer;
counterActions;

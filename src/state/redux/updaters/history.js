import produce from "immer";
import { sagaReducer } from "~/lib/state";

export default class History {
    static title = "history";

    state = [];

    update({ message, data }) {
        return sagaReducer({
            message,
            data,
            ifSend: this.state,
            ifSuccess: this.state,
            ifFailure: this.state,
            ifElse: this.state
        });
    }

    add({ message, data }) {
        return sagaReducer({
            message,
            data,
            ifSend: this.state,
            ifSuccess: produce(this.state, draft => {
                draft.unshift(input);
            }),
            ifFailure: this.state,
            ifElse: this.state
        });
    }
}

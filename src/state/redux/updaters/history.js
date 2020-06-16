import produce from "immer";
import { sagaReducer } from "~/lib/state";

export default class History {
    static title = "history";

    state = [];

    update({ message, data }) {
        return sagaReducer({
            message,
            data,
            onSend: this.state,
            onSuccess: this.state,
            onFailure: this.state,
            onOtherwise: this.state
        });
    }

    add({ message, data }) {
        return sagaReducer({
            message,
            data,
            onSend: this.state,
            onSuccess: produce(this.state, draft => {
                draft.unshift(input);
            }),
            onFailure: this.state,
            onOtherwise: this.state
        });
    }
}

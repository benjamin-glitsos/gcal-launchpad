import produce from "immer";
import parser from "~/lib/parser";
import { ifValidId, createId } from "~/lib/utilities";
import { sagaReducer } from "~/lib/state";

export default class Review {
    static title = "review";

    empty = {
        new: {
            status: process.env.messages.EMPTY,
            input: "",
            title: "",
            days: []
        }
    };

    state = this.empty;

    id = createId();

    updateInput(s) {
        return produce(this.state, draft => {
            draft.new.input = s;
        });
    }

    parse(s) {
        return produce(this.state, draft => {
            draft.new.status = process.env.messages.EDITING;
            Object.assign(draft.new, parser(s));
        });
    }

    clear() {
        return produce(this.state, draft => {
            draft.new = this.empty.new;
        });
    }

    new() {
        return produce(this.state, draft => {
            draft.new = this.empty.new;
            draft[this.id.next().value] = {
                ...this.state.new,
                status: process.env.messages.REVIEW
            };
        });
    }

    delete(id) {
        return produce(this.state, draft => {
            ifValidId(id, () => delete draft[id]);
        });
    }

    deleteAll() {
        return this.empty;
    }

    send({ message, data }) {
        return sagaReducer({
            message,
            data,
            onSend: produce(this.state, draft => {
                draft[id].status = process.env.messages.SEND;
            }),
            onSuccess: produce(this.state, draft => {
                draft[id].status = process.env.messages.SUCCESS;
            }),
            onFailure: produce(this.state, draft => {
                draft[id].status = process.env.messages.FAILURE;
            }),
            onOtherwise: this.state
        });
    }
}

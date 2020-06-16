import produce from "immer";
import parser from "~/lib/parser";
import { ifValidId, createId } from "~/lib/utilities";
import { sagaReducer } from "~/lib/state";

export default class Review {
    static title = "review";

    empty = {
        new: {
            input: "",
            title: "",
            days: [],
            status: process.env.settings.messages.review.EMPTY
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
            draft.new.status = process.env.settings.messages.review.EDITING;
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
                status: process.env.settings.messages.review.REVIEW
            };
        });
    }

    delete(ids) {
        return produce(this.state, draft => {
            ids.forEach(id => {
                ifValidId(id, () => delete draft[id]);
            });
        });
    }

    deleteAll() {
        return this.empty;
    }

    send({ message, data }) {
        return sagaReducer({
            message,
            data,
            ifSend: produce(this.state, draft => {
                draft[id].status = process.env.settings.messages.review.SEND;
            }),
            ifSuccess: produce(this.state, draft => {
                draft[id].status = process.env.settings.messages.review.SUCCESS;
            }),
            ifFailure: produce(this.state, draft => {
                draft[id].status = process.env.settings.messages.review.FAILURE;
            }),
            ifElse: this.state
        });
    }
}

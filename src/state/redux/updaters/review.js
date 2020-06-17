import produce from "immer";
import parser from "~/lib/parser";
import { createId } from "~/lib/utilities";

export default class Review {
    static title = "review";

    static selectors = {
        all: state => state.review
    };

    empty = {
        new: {
            status: process.env.messages.EMPTY,
            input: "",
            title: "",
            days: []
        }
    };

    id = createId();

    state = this.empty;

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
            if (id === "new") {
                draft.new = this.empty.new;
            } else {
                delete draft[id];
            }
        });
    }

    deleteAll() {
        return this.empty;
    }

    send({ id, input, title, days }) {
        return produce(this.state, draft => {
            draft[id].status = process.env.messages.REQUEST;
        });
    }

    sendSuccess(id) {
        return produce(this.state, draft => {
            draft[id].status = process.env.messages.SUCCESS;
        });
    }

    sendFailure(id) {
        return produce(this.state, draft => {
            draft[data.id].status = process.env.messages.FAILURE;
        });
    }

    sendAll() {
        return this.state;
    }

    sendAllSuccess() {
        return this.state;
    }

    sendAllFailure() {
        return this.state;
    }
}

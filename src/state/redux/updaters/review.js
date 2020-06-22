import produce from "immer";
import parser from "~/lib/parser";
import { createId } from "~/lib/utilities";

export default class Review {
    static title = "review";

    static selectors = {
        all: state => state.review,
        events: state =>
            Object.entries(
                produce(state.review, draft => {
                    if (draft.new.status === process.env.messages.EMPTY) {
                        delete draft.new;
                    }
                })
            ).map(([id, data]) => ({
                id,
                ...data
            })),
        event: key => state => state[key]
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
            if (draft.new.status !== process.env.messages.EMPTY) {
                draft.new = this.empty.new;
                draft[this.id.next().value] = {
                    ...this.state.new,
                    status: process.env.messages.REVIEW
                };
            }
        });
    }

    toDelete(id) {
        return produce(this.state, draft => {
            draft[id].status = process.env.messages.DELETED;
        });
    }

    toDeleteSuccess() {
        return this.state;
    }

    toDeleteFailure(id) {
        draft[id].status = process.env.messages.FAILURE;
    }

    toReview(id) {
        return produce(this.state, draft => {
            draft[id].status = process.env.messages.REVIEW;
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

    sendMultiple() {
        return this.state;
    }

    sendMultipleSuccess() {
        // TODO: mark all as success?
        return this.state;
    }

    sendMultipleFailure() {
        // TODO: mark all as failure?
        return this.state;
    }
}

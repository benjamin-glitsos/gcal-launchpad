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
        item: key => state => state.review[key]
    };

    empty = {
        new: {
            status: process.env.messages.EMPTY,
            countdown: process.env.settings.deletionDelaySeconds,
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
        return produce(this.state, draft => {
            draft[id].status = process.env.messages.FAILURE;
        });
    }

    toDeleteMultiple(ids) {
        return produce(this.state, draft => {
            ids.forEach(id => {
                draft[id].status = process.env.messages.DELETED;
            });
        });
    }

    toDeleteMultipleSuccess() {
        return this.state;
    }

    toDeleteMultipleFailure(id) {
        return this.state;
    }

    restoreDeleted(id) {
        return produce(this.state, draft => {
            draft[id].status = process.env.messages.REVIEW;
            draft[id].countdown = process.env.settings.deletionDelaySeconds;
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

    sendMultiple(events) {
        return produce(this.state, draft => {
            events.forEach(({ id }) => {
                draft[id].status = process.env.messages.REQUEST;
            });
        });
    }

    sendMultipleSuccess() {
        return this.state;
    }

    sendMultipleFailure() {
        return this.state;
    }

    decrementCountdown(id) {
        return produce(this.state, draft => {
            draft[id].countdown = draft[id].countdown - 1;
        });
    }
}

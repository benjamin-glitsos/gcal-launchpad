import produce from "immer";

export default class History {
    static title = "history";

    state = [];

    update(data) {
        return this.state;
    }

    updateSuccess() {
        return this.state;
    }

    updateFailure() {
        return this.state;
    }

    add(data) {
        return this.state;
    }

    addSuccess() {
        return produce(this.state, draft => {
            draft.unshift(input);
        });
    }

    addFailure() {
        return this.state;
    }
}

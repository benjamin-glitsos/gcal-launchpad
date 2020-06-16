import produce from "immer";

export default class History {
    static title = "history";

    state = [];

    update(length) {
        return this.state;
    }

    updateSuccess(data) {
        return data;
    }

    updateFailure() {
        return this.state;
    }

    add(input) {
        return this.state;
    }

    addSuccess(input) {
        return produce(this.state, draft => {
            draft.unshift(input);
        });
    }

    addFailure() {
        return this.state;
    }
}

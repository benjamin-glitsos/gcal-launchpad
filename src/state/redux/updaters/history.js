import produce from "immer";

export default class History {
    static title = "history";

    static selectors = {
        all: state => state.history
    };

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

    add(data) {
        return this.state;
    }

    addSuccess() {
        return this.state;
    }

    addFailure() {
        return this.state;
    }
}

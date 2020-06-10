export default class History {
    static title = "history";

    state = [];

    update() {
        return this.state;
    }

    updateSuccess(data) {
        return data;
    }

    updateFailure(err) {
        return this.state;
    }
}

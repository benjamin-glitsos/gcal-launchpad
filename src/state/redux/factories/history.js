export default class History {
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

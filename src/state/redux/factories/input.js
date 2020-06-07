export default class Input {
    empty = "";

    state = this.empty;

    update(data) {
        return data;
    }

    clear(data) {
        return this.empty;
    }
}

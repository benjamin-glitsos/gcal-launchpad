export default class Input {
    static title = "input";

    empty = "";

    state = this.empty;

    update(data) {
        return data;
    }

    clear(data) {
        return this.empty;
    }
}

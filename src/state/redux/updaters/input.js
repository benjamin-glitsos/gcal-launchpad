export default class Input {
    static title = "input";

    static selectors = {
        all: state => state.input
    };

    empty = "";

    state = this.empty;

    update(data) {
        return data;
    }

    clear() {
        return this.empty;
    }
}

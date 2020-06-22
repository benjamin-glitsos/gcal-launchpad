import produce from "immer";
import { randomItem, removeItem } from "~/lib/utilities";

export default class Input {
    static title = "input";

    static selectors = {
        all: state => state.input
    };

    empty = "";

    state = this.empty;

    update(s) {
        return s;
    }

    clear() {
        return this.empty;
    }
}

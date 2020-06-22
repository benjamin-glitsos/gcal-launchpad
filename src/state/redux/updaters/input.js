import produce from "immer";
import { randomItem, removeItem } from "~/lib/utilities";

export default class Input {
    static title = "input";

    static selectors = {
        all: state => state.input
    };

    placeholders = [
        "work out today, or else...",
        "d, 2d buy some milk",
        "2w go to meeting",
        "4d, 3y finish that book",
        "t, m, 2m, 3m, 4m buy in bulk",
        "t, d do it today, or maybe tomorrow",
        "100d challenge is finished"
    ];

    empty = {
        value: "",
        placeholder: ""
    };

    state = this.empty;

    update(s) {
        return produce(this.state, draft => {
            draft.value = s;
        });
    }

    clear() {
        return produce(this.state, draft => {
            draft.value = this.empty.value;
        });
    }

    randomPlaceholder() {
        return this.state;
    }

    randomPlaceholderSuccess() {
        return produce(this.state, draft => {
            draft.placeholder = randomItem(
                removeItem(draft.placeholder, this.placeholders)
            );
        });
    }

    randomPlaceholderFailure() {
        return this.state;
    }
}

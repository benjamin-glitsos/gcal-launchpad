export default class Popup {
    static title = "popup";

    static selectors = {
        isShown: state => state.popup
    };

    empty = false;

    state = this.empty;

    show() {
        return true;
    }

    hide() {
        return false;
    }
}

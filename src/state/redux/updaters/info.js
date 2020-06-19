export default class Info {
    static title = "info";

    static selectors = {
        isShown: state => state.info
    };

    empty = false;

    state = this.empty;

    show() {
        return true;
    }

    hide() {
        return false;
    }

    toggle() {
        return !this.state;
    }

    info() {
        return this.state;
    }

    infoSuccess() {
        return this.state;
    }

    infoFailure() {
        return this.state;
    }
}

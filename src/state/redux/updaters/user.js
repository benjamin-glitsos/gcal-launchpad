import produce from "immer";

export default class User {
    state = {
        username: "default_user",
        app_id: "TEST",
        time_zone: "Australia/Sydney"
    };

    update() {
        return this.state;
    }

    updateSuccess(data) {
        return data[0];
    }

    updateFailure() {
        return this.state;
    }
}

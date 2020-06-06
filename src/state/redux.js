import { combineReducers } from "redux";
import { useSelector } from "react-redux";
import { createUpdater } from "redux-lightweight";
import produce from "immer";
import parser from "~/lib/parser";
import { ifValidId, createId } from "~/lib/utilities";

export const [userReducer, userActions] = createUpdater(
    class User {
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
);

export const [inputReducer, inputActions] = createUpdater(
    class Input {
        empty = "";

        state = this.empty;

        update(data) {
            return data;
        }

        clear(data) {
            return this.empty;
        }
    }
);

export const [reviewReducer, reviewActions] = createUpdater(
    class Review {
        empty = {
            new: {
                title: "",
                days: [],
                isSelected: false,
                status: process.env.settings.symbols.review.EMPTY,
                error: ""
            }
        };

        state = this.empty;

        id = createId();

        toggleSelect(id) {
            return produce(this.state, draft => {
                draft[id].isSelected = !draft[id].isSelected;
            });
        }

        parse(s, timeZone) {
            return produce(this.state, draft => {
                draft.new.status = process.env.settings.symbols.review.REVIEW;
                Object.assign(draft.new, parser(s, { timeZone }));
            });
        }

        clear() {
            return produce(this.state, draft => {
                draft.new = this.empty.new;
            });
        }

        new() {
            return produce(this.state, draft => {
                draft.new = this.empty.new;
                draft[this.id.next().value] = this.state.new;
            });
        }

        manuallyCreateNew() {
            return produce(this.state, draft => {
                draft.new = {
                    ...this.empty.new,
                    ...{ status: process.env.settings.symbols.review.EDITING }
                };
                draft[this.id.next().value] = this.state.new;
            });
        }

        update(id, j) {
            return produce(this.state, draft => {
                ifValidId(id, () => {
                    draft[id] = { ...draft[id], ...j };
                });
            });
        }

        updateDay({ reviewId, dayIndex, dayValue }) {
            return produce(this.state, draft => {
                draft.days[dayIndex] = dayValue;
            });
        }

        delete(ids) {
            return produce(this.state, draft => {
                ids.forEach(id => {
                    ifValidId(id, () => delete draft[id]);
                });
            });
        }

        deleteAll() {
            return this.empty;
        }

        send() {
            return this.state;
        }

        sendAll() {
            return this.state;
        }

        sendSuccess() {
            return this.state;
        }

        sendFailure() {
            return this.state;
        }
    }
);

export const [historyReducer, historyActions] = createUpdater(
    class History {
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
);

export const rootReducer = combineReducers({
    user: userReducer,
    input: inputReducer,
    review: reviewReducer,
    history: historyReducer
});

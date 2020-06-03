import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { Input } from "@rebass/forms";
import { wrapper } from "~/state/store";
import { inputActions, reviewActions, historyActions } from "~/state/redux";

const Index = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const inputState = useSelector(state => state.input);
    const onChangeHandler = e => {
        e.preventDefault();
        const value = e.target.value;
        dispatch(inputActions.update(e.target.value));
        if (value.length > 0) {
            dispatch(reviewActions.parse(input));
        } else {
            dispatch(reviewActions.clear());
        }
    };
    const onKeyPressHandler = e => {
        if (e.key === "Enter") {
            dispatch(reviewActions.enter());
            dispatch(inputActions.clear());
        }
    };
    return (
        <Fragment>
            <h1>{process.env.settings.title}</h1>
            {/* TODO: make parser always return today as default instead of empty array for 'days' object key */}
            <Input
                type="text"
                placeholder="d, 2d, 2w buy some milk"
                value={inputState}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </Fragment>
    );
};

export default Index;

import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "rebass";
import { Input } from "@rebass/forms";
import { useUpdater } from "redux-lightweight";
import { wrapper } from "~/state/store";
import { inputActions, reviewActions, historyActions } from "~/state/redux";
import ReviewEvent from "~/components/review-event";

const Index = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const inputState = useSelector(state => state.input);
    const reviewState = useSelector(state => state.review);
    const timeZone = useSelector(state => state.user.time_zone);
    const onChangeHandler = e => {
        e.preventDefault();
        const value = e.target.value;
        dispatch(inputActions.update(value));
        if (value.length > 0) {
            dispatch(reviewActions.parse(value, timeZone));
        } else {
            dispatch(reviewActions.clear());
        }
    };
    const onKeyPressHandler = e => {
        if (e.key === "Enter") {
            dispatch(reviewActions.new());
            dispatch(inputActions.clear());
        }
    };
    return (
        <Fragment>
            <Heading color="primary">{process.env.settings.title}</Heading>
            {Object.entries(reviewState)
                .filter(([key, val]) => val.status !== "EMPTY")
                .map(([key, val]) => (
                    <ReviewEvent {...{ key, ...val }} />
                ))}
            <Input
                type="text"
                placeholder="d, 2d, 2w buy some milk"
                value={inputState}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                color="primary"
                my={4}
            />
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </Fragment>
    );
};

export default Index;

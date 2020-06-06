import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading } from "rebass";
import { Input } from "@rebass/forms";
import { useUpdater } from "redux-lightweight";
import { wrapper } from "~/state/store";
import { inputActions, reviewActions, historyActions } from "~/state/redux";
import ReviewEvent from "~/components/review-event";

const Index = () => {
    const symbols = process.env.settings.symbols;
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
            {/* TODO: make parser stop using the first letter unless it has a space */}
            {/* after it */}
            {/* TRY OUT THE FIX THAT IVE ALREADY MADE: BY USING WHITESPACE1 */}
            {/* TODO: make button for selectAll and use that for the delete all, */}
            {/* send all operations? */}
            {/* Or not? */}
            {/* TODO: get google calendar api auth working and make an api that */}
            {/* posts the auth code returned to the user table of the database */}
            <Heading color="primary">{process.env.settings.title}</Heading>
            {Object.entries(reviewState)
                .filter(([id, values]) =>
                    [symbols.review.REVIEW, symbols.review.EDITING].includes(
                        values.status
                    )
                )
                .map(([id, values]) => (
                    <ReviewEvent
                        {...{ id, ...values }}
                        key={id + values.title}
                    />
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

import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { Heading } from "rebass";
import { Input } from "@rebass/forms";
import { wrapper } from "~/state/store";
import { input, review } from "~/state/redux/index";
import ReviewEvent from "~/components/review-event";
import { listEvents2 } from "~/lib/google-calendar";

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
        dispatch(input.actions.update(value));
        if (value.length > 0) {
            dispatch(review.actions.parse(value, timeZone));
        } else {
            dispatch(review.actions.clear());
        }
    };
    const onKeyPressHandler = e => {
        if (e.key === "Enter") {
            dispatch(review.actions.new());
            dispatch(input.actions.clear());
        }
    };
    listEvents2();
    return (
        <Fragment>
            {/* TODO: steps to MVP: */}
            {/* - Google calendar auth */}
            {/* - Google calendar insertEvent saga */}
            {/* - Making card contain "In: 1 days". But not editable yet */}
            {/* - Theming */}
            {/* TODO: make button for selectAll and use that for the delete all, */}
            {/* send all operations? */}
            {/* Or not? */}
            {/* TODO: instead of calendar dropdowns, for now just use this on the UI: */}
            {/* IN: 1 days */}
            {/* AND: 3 weeks */}
            {/* (The number is editable and the unit is a dropdown) */}
            {/* TODO: clicking on the review area will send the cursor to the input box? */}
            {/* TODO: make the review area its own component */}
            <Head>
                <title>{process.env.settings.title}</title>
                {/* <script src="https://apis.google.com/js/api.js"></script> */}
            </Head>
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

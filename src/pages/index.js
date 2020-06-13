import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { Heading } from "rebass";
import { Input } from "@rebass/forms";
import { wrapper } from "~/state/store";
import { input, review } from "~/state/redux/index";
import ReviewEvent from "~/components/review-event";
import ReviewArea from "~/components/review-area";

const Index = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const inputState = useSelector(state => state.input);
    const onChangeHandler = e => {
        e.preventDefault();
        const value = e.target.value;
        dispatch(input.actions.update(value));
        if (value.length > 0) {
            dispatch(review.actions.parse(value));
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
    return (
        <Fragment>
            {/* TODO: steps to MVP: */}
            {/* - Making card contain "In: 1 days". But not editable yet */}
            {/* - Theming */}
            {/* TODO: instead of calendar dropdowns, for now just use this on the UI: */}
            {/* IN: 1 days */}
            {/* AND: 3 weeks */}
            {/* (The number is editable and the unit is a dropdown) */}
            {/* TODO: clicking on the review area will send the cursor to the input box? */}
            {/* TODO: make the review area its own component */}
            <Head>
                <title>{process.env.settings.title}</title>
            </Head>
            <Heading color="primary">{process.env.settings.title}</Heading>
            <Input
                type="text"
                placeholder="d, 2d, 2w buy some milk"
                value={inputState}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                color="primary"
                my={4}
            />
            <ReviewArea />
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </Fragment>
    );
};

export default Index;

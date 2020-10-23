import PropTypes from "prop-types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@rebass/forms";
import { input, review } from "~/state/redux/index";
import { randomItem, removeItem } from "~/lib/utilities";

export default function EventInput() {
    const eventsLength = useSelector(review.selectors.events).length;

    const value = useSelector(input.selectors.all);

    const dispatch = useDispatch();

    const onChangeHandler = e => {
        e.preventDefault();
        const value = e.target.value;
        dispatch(input.actions.update(value));
        if (value.length > 0) {
            [
                review.actions.updateInput(value),
                review.actions.parse(value)
            ].forEach(dispatch);
        } else {
            dispatch(review.actions.clear());
        }
    };

    const onKeyPressHandler = e => {
        if (e.key === "Enter") {
            [review.actions.new(), input.actions.clear()].forEach(dispatch);
        }
    };

    return (
        <Input
            type="text"
            placeholder={
                eventsLength === 0 ? "Type an event..." : "Type another..."
            }
            value={value}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            variant="mainInput"
            sx={{
                px: 3,
                py: 2,
                color: "primary",
                background: "white",
                fontWeight: "bold",
                fontSize: 3
            }}
        />
    );
}

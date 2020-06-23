import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@rebass/forms";
import { input, review } from "~/state/redux/index";
import { randomItem, removeItem } from "~/lib/utilities";

const CONST = 1;

export default function EventInput({ placeholders }) {
    const eventsLength = useSelector(review.selectors.events).length;

    const value = useSelector(input.selectors.all);

    const [placeholder, setPlaceholder] = useState("");

    useEffect(() => {
        const nextPlaceholder = randomItem(
            removeItem(placeholder, placeholders)
        );
        setPlaceholder(nextPlaceholder);
    }, [eventsLength]);

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
                (eventsLength === 0 ? "" : "Add another e.g. ") + placeholder
            }
            value={value}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            variant="mainInput"
        />
    );
}

EventInput.propTypes = {
    placeholders: PropTypes.arrayOf(PropTypes.string).isRequired
};

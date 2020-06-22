import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@rebass/forms";
import { input, review } from "~/state/redux/index";
import { randomItem } from "~/lib/utilities";

export default function EventInput() {
    const { value: inputValue, placeholder: inputPlaceholder } = useSelector(
        input.selectors.all
    );

    const events = useSelector(review.selectors.events);

    const dispatch = useDispatch();

    const placeholder =
        events.length === 0
            ? inputPlaceholder
            : `Add another e.g. ${inputPlaceholder}`;

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
            [
                review.actions.new(),
                input.actions.randomPlaceholder(),
                input.actions.clear()
            ].forEach(dispatch);
        }
    };

    // useEffect(() => {
    //     return placeholder2;
    // });

    return (
        <Input
            type="text"
            placeholder={placeholder2}
            value={inputValue}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            variant="mainInput"
        />
    );
}

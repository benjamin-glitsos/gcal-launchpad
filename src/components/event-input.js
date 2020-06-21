import { useDispatch, useSelector } from "react-redux";
import { Input } from "@rebass/forms";
import { input, review } from "~/state/redux/index";
import { randomItem } from "~/lib/utilities";

export default function EventInput({ placeholders }) {
    const { inputValue, inputPlaceholder } = useSelector(input.selectors.all);
    const events = useSelector(review.selectors.events);
    const dispatch = useDispatch();
    const placeholder =
        events.length === 0
            ? randomItem(placeholders)
            : `Add another: ${randomItem(placeholders)}`;
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
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            variant="mainInput"
        />
    );
}

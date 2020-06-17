import { useDispatch, useSelector } from "react-redux";
import { Input } from "@rebass/forms";
import { input, review } from "~/state/redux/index";
import { randomItem } from "~/lib/utilities";

export default function EventInput({ placeholders }) {
    const [inputState, reviewState] = useSelector(state => [
        state.input,
        state.review
    ]);
    const dispatch = useDispatch();
    const reviewStateIsEmpty = Object.keys(reviewState).length === 1;
    const placeholder = reviewStateIsEmpty
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
            placeholder={placeholder}
            value={inputState}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            variant="mainInput"
        />
    );
}

import { useDispatch, useSelector } from "react-redux";
import { Input } from "@rebass/forms";
import { input, review } from "~/state/redux/index";

export default function EventInput({ placeholder }) {
    const [inputState, reviewState] = useSelector(state => [
        state.input,
        state.review
    ]);
    const dispatch = useDispatch();
    const reviewStateIsEmpty = Object.keys(reviewState).length === 1;
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
            [review.actions.new(), input.actions.clear()].forEach(dispatch);
        }
    };
    return (
        <Input
            type="text"
            placeholder={reviewStateIsEmpty ? placeholder : "Add another ..."}
            value={inputState}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            variant="mainInput"
        />
    );
}

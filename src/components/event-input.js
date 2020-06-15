import { useDispatch, useSelector } from "react-redux";
import { Input } from "@rebass/forms";
import { input, review } from "~/state/redux/index";

export default function EventInput({ placeholder }) {
    const inputState = useSelector(state => state.input);
    const dispatch = useDispatch();
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
            placeholder={placeholder}
            value={inputState}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            variant="mainInput"
        />
    );
}

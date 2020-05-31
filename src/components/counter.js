import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "~/state/actions";

const Counter = () => {
    const count = useSelector(state => state.count);
    const dispatch = useDispatch();
    return (
        <div>
            <p>
                Count: <span>{count}</span>
            </p>
            <button onClick={() => dispatch(increment())}>+1</button>
            <button onClick={() => dispatch(decrement())}>-1</button>
            <button onClick={() => dispatch(reset())}>Reset</button>
        </div>
    );
};

export default Counter;

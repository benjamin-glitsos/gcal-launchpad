import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "~/state/store";
import { inputActions, reviewActions, historyActions } from "~/state/redux";

const Index = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const handleChange = e => {
        const input = e.target.value;
        dispatch(inputActions.updateInput(input));
        dispatch(reviewActions.parseEvents(input));
    };
    return (
        <Fragment>
            <h1>Home</h1>
            {/* TODO: add handler for Enter and C-Enter so that this actually pushes to Review state and clears input */}
            <input type="text" onChange={handleChange} />
            <h2>State:</h2>
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </Fragment>
    );
};

export default Index;

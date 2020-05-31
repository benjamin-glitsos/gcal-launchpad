import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "~/state/store";
import { updateInputActions, getHistoryActions } from "~/state/redux";

const Index = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const handleChange = e =>
        dispatch(updateInputActions.updateInput(e.target.value));
    return (
        <Fragment>
            <h1>Home</h1>
            <input type="text" onChange={handleChange} />
            <p>State:</p>
            <code>{JSON.stringify(state)}</code>
        </Fragment>
    );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    if (store.getState().history.length === 0) {
        // store.dispatch(getHistoryActions.getHistory());
        store.dispatch(END);
    }
    await store.sagaTask.toPromise();
});

export default Index;

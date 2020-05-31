import { useEffect, Fragment } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "~/state/store";
import { getHistory } from "~/state/actions";
import { updateInputActions } from "~/state/redux";

const Index = ({ updateInput }) => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const handleChange = e => updateInput(e.target.value);
    return (
        <Fragment>
            <h1>Home</h1>
            <input type="text" onChange={handleChange} />
            <p>State:</p>
            <code>{JSON.stringify(state)}</code>
        </Fragment>
    );
};

const mapStateToProps = state => ({ input: state });

const mapDispatchToProps = {
    updateInput: updateInputActions.updateInput
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    if (store.getState().history.length === 0) {
        store.dispatch(getHistory());
        store.dispatch(END);
    }
    await store.sagaTask.toPromise();
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);

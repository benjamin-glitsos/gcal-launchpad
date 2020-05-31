import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "~/state/store";
import { loadData } from "~/state/actions";
import Counter from "~/components/counter";

const Index = () => {
    // useEffect(() => {}, [dispatch]);
    const state = useSelector(state => state);
    return (
        <Fragment>
            <h1>Home</h1>
            <Counter />
            <p>State:</p>
            <code>{JSON.stringify(state)}</code>
        </Fragment>
    );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    if (!store.getState().placeholderData) {
        store.dispatch(loadData());
        store.dispatch(END);
    }
    await store.sagaTask.toPromise();
});

export default Index;

import { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "~/state/store";
import { loadData } from "~/state/actions";
import Counter from "~/components/counter";

const Index = () => {
    // useEffect(() => {}, [dispatch]);
    const placeholderData = useSelector(state => state.placeholderData);
    const error = useSelector(state => state.error);
    const lastUpdate = useSelector(state => state.lastUpdate);
    return (
        <Fragment>
            <h1>Home</h1>
            <Counter />
            {placeholderData && (
                <pre>
                    <code>{JSON.stringify(placeholderData, null, 2)}</code>
                </pre>
            )}
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
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

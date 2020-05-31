import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "~/state/store";
import { loadData } from "~/state/actions";
import Page from "~/components/page";

const Index = () => {
    // const dispatch = useDispatch();
    //
    // useEffect(() => {}, [dispatch]);
    return (
        <>
            <Page title="Index Page" linkTo="/other" NavigateTo="Other Page" />
        </>
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

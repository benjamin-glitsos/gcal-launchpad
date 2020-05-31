import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { wrapper } from "~/state/store";
import { startClock, tickClock } from "~/state/actions";
import Page from "~/state/components/page";

const Other = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(startClock());
    }, [dispatch]);

    return <Page title="Other Page" linkTo="/" NavigateTo="Index Page" />;
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    store.dispatch(tickClock(false));
});

export default Other;

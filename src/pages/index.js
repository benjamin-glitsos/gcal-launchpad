import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "~/components/Page";
import { addCount } from "~/state/count/action";
import AddCount from "~/components/AddCount";
import { wrapper } from "~/state/store";

const Index = props => {
    console.log(props);
    const state = JSON.stringify(props);
    return (
        <Fragment>
            <AddCount />
            <h2>Redux State:</h2>
            <code>{state}</code>
        </Fragment>
    );
};

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
    store.dispatch(addCount());
});

const mapDispatchToProps = dispatch => {
    return {
        addCount: bindActionCreators(addCount, dispatch)
    };
};

export default wrapper.withredux(
    connect(state => state, mapDispatchToProps)(Index)
);

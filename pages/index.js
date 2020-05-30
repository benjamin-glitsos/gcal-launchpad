import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Page from "../components/Page";
import { addCount } from "../store/count/action";
import AddCount from "../components/AddCount";
import { wrapper } from "../store/store";

const Index = props => {
    return (
        <Fragment>
            <AddCount />
            <h2>Redux State:</h2>
            <code>{JSON.stringify(props)}</code>
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

export default connect(state => state, mapDispatchToProps)(Index);

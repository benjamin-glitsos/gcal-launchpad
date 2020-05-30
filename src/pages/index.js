import withRedux from "next-redux-wrapper";

const Home = ({ foo, custom }) => (
    <div>
        <div>Prop from Redux {foo}</div>
        <div>Prop from getInitialProps {custom}</div>
    </div>
);

Home.getInitialProps = ({ store, isServer, pathname, query }) => {
    // component will read from store's state when rendered
    store.dispatch({ type: "FOO", payload: "foo" });
    // pass some custom props to component from here
    return { custom: "custom" };
};

Home = withRedux(makeStore, state => ({ foo: state.foo }))(Home);

export default Home;

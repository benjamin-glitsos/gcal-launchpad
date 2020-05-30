import React from "react";
import App from "next/app";
import { wrapper } from "../redux/store";

class WrappedApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        return <Component {...pageProps} />;
    }
}

export default wrapper.withRedux(WrappedApp);

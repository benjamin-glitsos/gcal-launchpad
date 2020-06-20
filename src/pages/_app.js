import App from "next/app";
import { END } from "redux-saga";
import withGA from "next-ga";
import Router from "next/router";
import { ThemeProvider } from "theme-ui";
import { wrapper } from "~/state/store";
import theme from "~/lib/theme";

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = {
            ...(Component.getInitialProps
                ? await Component.getInitialProps(ctx)
                : {})
        };

        if (ctx.req) {
            ctx.store.dispatch(END);
            await ctx.store.sagaTask.toPromise();
        }

        return { pageProps };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        );
    }
}

export default wrapper.withRedux(
    withGA(process.env.GA_TRACKING_CODE, Router)(MyApp)
);

import { Fragment } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { Heading } from "rebass";
import ReviewArea from "~/components/review-area";
import EventInput from "~/components/event-input";

export default function Index() {
    const state = useSelector(state => state);
    return (
        <Fragment>
            {/* TODO: steps to MVP: */}
            {/* * Info popup using: MDX, rebass, saga, cookies (react-cookie?) */}
            {/* - Theming */}
            <Head>
                <title>{process.env.settings.title}</title>
            </Head>
            <Heading variant="h1">{process.env.settings.title}</Heading>
            <EventInput placeholder="d, 2d, 2w buy some milk" />
            <ReviewArea placeholder="Review area" />
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </Fragment>
    );
}

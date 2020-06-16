import { Fragment } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { Heading } from "rebass";
import ReviewArea from "~/components/review-area";
import EventInput from "~/components/event-input";
import HistoryList from "~/components/history-list";

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
            <EventInput
                placeholders={[
                    "work out today, or else...",
                    "d, 2d buy some milk",
                    "2w go to meeting",
                    "4d, 3y finish that book",
                    "t, m, 2m, 3m, 4m buy in bulk",
                    "t, d do it today, or maybe tomorrow",
                    "100d challenge is finished"
                ]}
            />
            <ReviewArea />
            <HistoryList />
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </Fragment>
    );
}

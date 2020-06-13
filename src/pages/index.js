import { Fragment } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import { Heading } from "rebass";
import ReviewEvent from "~/components/review-event";
import ReviewArea from "~/components/review-area";
import EventInput from "~/components/event-input";

const Index = () => {
    const state = useSelector(state => state);
    return (
        <Fragment>
            {/* TODO: steps to MVP: */}
            {/* - Making card contain "In: 1 days". But not editable yet */}
            {/* - Theming */}
            {/* TODO: instead of calendar dropdowns, for now just use this on the UI: */}
            {/* IN: 1 days */}
            {/* AND: 3 weeks */}
            {/* (The number is editable and the unit is a dropdown) */}
            <Head>
                <title>{process.env.settings.title}</title>
            </Head>
            <Heading color="primary">{process.env.settings.title}</Heading>
            <EventInput />
            <ReviewArea />
            <pre>
                <code>{JSON.stringify(state, null, 4)}</code>
            </pre>
        </Fragment>
    );
};

export default Index;

import { Fragment } from "react";
import { default as NextHead } from "next/head";
import { Heading, Flex, Box } from "rebass";
import ReviewArea from "~/components/review-area";
import EventInput from "~/components/event-input";
import HistoryList from "~/components/history-list";
import InfoCard from "~/components/info-card";
import MainMenu from "~/components/main-menu";
import PatternBackground from "~/components/pattern-background";
import Page from "~/components/page";

const Head = () => (
    <NextHead>
        <title>{process.env.settings.title}</title>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </NextHead>
);

const Body = () => (
    <Fragment>
        <Page pt={4} pb={2}>
            <Flex alignItems="center" flexWrap="wrap">
                <Box width={[1, 1 / 2]} pb={[3, 1]}>
                    <Heading variant="h1" textAlign={["center", "left"]}>
                        {process.env.settings.title}
                    </Heading>
                </Box>
                <Box width={[1, 1 / 2]}>
                    <MainMenu />
                </Box>
            </Flex>
        </Page>
        <PatternBackground py={2}>
            <Page>
                <Flex my={3}>
                    <Box width={1}>
                        <EventInput />
                    </Box>
                </Flex>
                <ReviewArea />
                <InfoCard />
            </Page>
        </PatternBackground>
        <Page>
            <HistoryList title="Try these examples:" />
        </Page>
    </Fragment>
);

export default function Index() {
    return (
        <Fragment>
            <Head />
            <Body />
        </Fragment>
    );
}

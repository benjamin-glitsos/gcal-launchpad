import { Fragment } from "react";
import Head from "next/head";
import { Heading, Flex, Box } from "rebass";
import ReviewArea from "~/components/review-area";
import EventInput from "~/components/event-input";
import HistoryList from "~/components/history-list";
import InfoCard from "~/components/info-card";
import MainMenu from "~/components/main-menu";
import PatternBackground from "~/components/pattern-background";
import Page from "~/components/page";

export default function Index() {
    return (
        <Fragment>
            <Head>
                <title>{process.env.settings.title}</title>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                    type="image/x-icon"
                />
            </Head>
            <PatternBackground pt={4} pb={3}>
                <Page>
                    <Flex alignItems="center" flexWrap="wrap">
                        <Box width={[1, 1 / 2]} pb={[3, 1]}>
                            <Heading
                                variant="h1"
                                textAlign={["center", "left"]}
                            >
                                {process.env.settings.title}
                            </Heading>
                        </Box>
                        <Box width={[1, 1 / 2]}>
                            <MainMenu />
                        </Box>
                    </Flex>
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
}

import { useDispatch } from "react-redux";
import { Flex, Box } from "rebass";
import { useSelector } from "react-redux";
import { review } from "~/state/redux";
import ButtonBar from "~/components/button-bar";
import ReviewCard from "~/components/review-card";
import StatusBar from "~/components/status-bar";

export default function ReviewArea() {
    const dispatch = useDispatch();
    const events = useSelector(review.selectors.events);
    const activeEvents = events.filter(
        event => event.status !== process.env.messages.DELETED
    );
    const hasEvents = events.length > 0;
    const hasActiveEvents = activeEvents.length > 0;
    const activeIds = activeEvents.map(event => event.id);
    return (
        hasEvents && (
            <Flex pt={[0, 2]} pb={3}>
                <Box width={1}>
                    <Flex mb={2} alignItems="center" flexWrap="wrap">
                        <Box width={[1, 1 / 2]}>
                            <StatusBar events={events} />
                        </Box>
                        <Box width={[1, 1 / 2]}>
                            <ButtonBar
                                justifyContent={["center", "flex-end"]}
                                mb={[2, 0]}
                                list={[
                                    {
                                        title: "Delete All",
                                        isDisplayed: hasActiveEvents,
                                        variant: "outline",
                                        onClick: () =>
                                            dispatch(
                                                review.actions.toDeleteMultiple(
                                                    activeIds
                                                )
                                            )
                                    },
                                    {
                                        title: "Send All",
                                        isDisplayed: hasActiveEvents,
                                        variant: "primary",
                                        onClick: () =>
                                            dispatch(
                                                review.actions.sendMultiple(
                                                    activeEvents
                                                )
                                            )
                                    }
                                ]}
                            />
                        </Box>
                    </Flex>
                    <Flex flexWrap="wrap" m={-2}>
                        {events.map((event, i) => (
                            <Box width={[1, 1 / 2]} p={2} key={event.title + i}>
                                <ReviewCard {...{ ...event }} />
                            </Box>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        )
    );
}

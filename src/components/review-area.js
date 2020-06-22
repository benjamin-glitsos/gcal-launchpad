import { useDispatch } from "react-redux";
import { Flex, Box } from "rebass";
import { useSelector } from "react-redux";
import { review } from "~/state/redux";
import ButtonBar from "~/components/button-bar";
import ReviewCard from "~/components/review-card";

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
            <Flex my={2}>
                <Box width={1}>
                    <Flex mb={3} height={40}>
                        <Box width={1}>
                            <ButtonBar
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

import { useDispatch } from "react-redux";
import { Flex, Box } from "rebass";
import { useSelector } from "react-redux";
import { review } from "~/state/redux";
import ButtonBar from "~/components/button-bar";
import ReviewCard from "~/components/review-card";

export default function ReviewArea() {
    const dispatch = useDispatch();
    const events = useSelector(review.selectors.events);
    const hasEvents = events.length > 0;
    return (
        hasEvents && (
            <Flex my={2}>
                <Box width={1}>
                    <Flex mb={3}>
                        <Box width={1}>
                            <ButtonBar
                                list={[
                                    {
                                        title: "Delete All",
                                        isDisplayed: true,
                                        variant: "outline",
                                        onClick: () =>
                                            dispatch(review.actions.deleteAll())
                                    },
                                    {
                                        title: "Send All",
                                        isDisplayed: true,
                                        variant: "primary",
                                        onClick: () =>
                                            dispatch(
                                                review.actions.sendMultiple(
                                                    events
                                                )
                                            )
                                    }
                                ]}
                            />
                        </Box>
                    </Flex>
                    <Flex flexWrap="wrap">
                        {events.map((event, i) => (
                            <Box width={1 / 2}>
                                <ReviewCard
                                    {...{ ...event }}
                                    key={event.title + i}
                                />
                            </Box>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        )
    );
}

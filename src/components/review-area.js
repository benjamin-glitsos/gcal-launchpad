import { useDispatch } from "react-redux";
import { Box } from "rebass";
import { useSelector } from "react-redux";
import { review } from "~/state/redux";
import ButtonBar from "~/components/button-bar";
import ReviewCard from "~/components/review-card";

export default function ReviewArea() {
    const dispatch = useDispatch();
    const events = Object.entries(useSelector(review.selectors.allExceptEmpty));
    const hasEvents = events.length > 0;
    return (
        hasEvents && (
            <Box>
                <ButtonBar
                    list={[
                        {
                            title: "Delete All",
                            isDisplayed: true,
                            onClick: () => dispatch(review.actions.deleteAll())
                        },
                        {
                            title: "Send All",
                            isDisplayed: true,
                            onClick: () => dispatch(review.actions.sendAll())
                        }
                    ]}
                />
                {events.map(([id, values], i) => (
                    <ReviewCard {...{ id, ...values }} key={values.title + i} />
                ))}
            </Box>
        )
    );
}

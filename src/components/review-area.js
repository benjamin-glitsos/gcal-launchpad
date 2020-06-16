import { useDispatch } from "react-redux";
import { Box } from "rebass";
import { useSelector } from "react-redux";
import { review } from "~/state/redux";
import ButtonBar from "~/components/button-bar";
import ReviewCard from "~/components/review-card";

export default function ReviewArea() {
    const symbols = process.env.settings.symbols;
    const dispatch = useDispatch();
    const reviewState = useSelector(state => state.review);
    const events = Object.entries(reviewState).filter(
        ([id, { status }]) => status !== symbols.review.EMPTY
    );
    const hasEvents = events.length > 0;
    return (
        hasEvents && (
            <Box>
                <ButtonBar
                    list={[
                        {
                            title: "Delete All",
                            isDisplayed: hasEvents,
                            onClick: () => dispatch(review.actions.deleteAll())
                        }
                    ]}
                />
                {events.map(([id, values]) => (
                    <ReviewCard
                        {...{ id, ...values }}
                        key={id + values.title}
                    />
                ))}
            </Box>
        )
    );
}

import { Box } from "rebass";
import { useSelector } from "react-redux";
import ReviewEvent from "~/components/review-event";

export default function ReviewArea() {
    const symbols = process.env.settings.symbols;
    const reviewState = useSelector(state => state.review);
    const events = Object.entries(reviewState).filter(([id, values]) =>
        [symbols.review.REVIEW, symbols.review.EDITING].includes(values.status)
    );
    return (
        <Box>
            {events.length > 0
                ? events.map(([id, values]) => (
                      <ReviewEvent
                          {...{ id, ...values }}
                          key={id + values.title}
                      />
                  ))
                : "Create an event"}
        </Box>
    );
}

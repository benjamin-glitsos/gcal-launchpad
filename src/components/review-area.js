import { Box } from "rebass";
import { useSelector } from "react-redux";
import ReviewCard from "~/components/review-card";

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
                      <ReviewCard
                          {...{ id, ...values }}
                          key={id + values.title}
                      />
                  ))
                : "Review area"}
        </Box>
    );
}

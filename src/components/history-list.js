import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Flex, Box } from "rebass";
import { input, history, review } from "~/state/redux";
import Link from "~/components/link";

export default function HistoryList({ title }) {
    const dispatch = useDispatch();
    const inputState = useSelector(input.selectors.all);
    const historyState = useSelector(history.selectors.all);
    return (
        <Fragment>
            <Heading>{title}</Heading>
            <Flex width={1} flexWrap="wrap">
                {historyState.map((historyInput, i) => (
                    <Box width={[1, 1 / 2, 1 / 4]}>
                        <Link
                            onClick={() =>
                                [
                                    review.actions.new(),
                                    input.actions.update(historyInput),
                                    review.actions.parse(historyInput)
                                ].forEach(dispatch)
                            }
                            key={historyInput + i}
                        >
                            {historyInput}
                        </Link>
                    </Box>
                ))}
            </Flex>
        </Fragment>
    );
}

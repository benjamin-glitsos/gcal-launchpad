import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Flex, Box } from "rebass";
import { input, history, review } from "~/state/redux";
import ColumnList from "~/components/column-list";
import Link from "~/components/link";

export default function HistoryList({ title }) {
    const dispatch = useDispatch();
    const historyList = useSelector(history.selectors.all);
    return (
        historyList.length > 0 && (
            <Flex my={4}>
                <Box width={1}>
                    <Heading variant="h2">{title}</Heading>
                    <ColumnList width={[1, 1 / 2, 1 / 3]} py={[2, 1]}>
                        {historyList.map((historyInput, i) => (
                            <Link
                                key={historyInput + i}
                                onClick={() =>
                                    [
                                        review.actions.new(),
                                        input.actions.update(historyInput),
                                        review.actions.parse(historyInput)
                                    ].forEach(dispatch)
                                }
                                color="text"
                            >
                                {historyInput}
                            </Link>
                        ))}
                    </ColumnList>
                </Box>
            </Flex>
        )
    );
}

HistoryList.propTypes = {
    title: PropTypes.string.isRequired
};

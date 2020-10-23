import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Flex, Box } from "rebass";
import { history } from "~/state/redux";
import ColumnList from "~/components/column-list";
import Link from "~/components/link";
import HistoryItem from "~/components/history-item";

export default function HistoryList({ title }) {
    const dispatch = useDispatch();
    const historyList = useSelector(history.selectors.all);
    return (
        historyList.length > 0 && (
            <Flex pt={3}>
                <Box width={1}>
                    <Heading variant="h3" textAlign={["center", "left"]}>
                        {title}
                    </Heading>
                    <ColumnList
                        width={[1, 1 / 2, 1 / 3]}
                        py={[2, 1]}
                        textAlign={["center", "left"]}
                    >
                        {historyList.map((title, i) => (
                            <HistoryItem title={title} key={title + i} />
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

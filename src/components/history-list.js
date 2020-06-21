import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Flex, Box } from "rebass";
import { input, history, review } from "~/state/redux";
import ColumnList from "~/components/column-list";
import Link from "~/components/link";

export default function HistoryList({ title }) {
    const dispatch = useDispatch();
    const inputState = useSelector(input.selectors.all);
    const historyState = useSelector(history.selectors.all);
    return (
        <Fragment>
            <Heading variant="h2">{title}</Heading>
            <ColumnList width={[1, 1 / 2, 1 / 3, 1 / 4]}>
                {historyState.map((historyInput, i) => (
                    <Link
                        onClick={() =>
                            [
                                review.actions.new(),
                                input.actions.update(historyInput),
                                review.actions.parse(historyInput)
                            ].forEach(dispatch)
                        }
                        color="text"
                        key={historyInput + i}
                    >
                        {historyInput}
                    </Link>
                ))}
            </ColumnList>
        </Fragment>
    );
}

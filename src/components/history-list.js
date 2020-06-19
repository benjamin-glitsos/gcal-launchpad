import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Link } from "rebass";
import { input, history, review } from "~/state/redux";

export default function HistoryList({ title }) {
    const dispatch = useDispatch();
    const inputState = useSelector(input.selectors.all);
    const historyState = useSelector(history.selectors.all);
    return (
        <Fragment>
            <Heading>{title}</Heading>
            {historyState.map((historyInput, i) => (
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
            ))}
        </Fragment>
    );
}

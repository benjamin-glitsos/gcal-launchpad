import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Link } from "rebass";
import { input, history } from "~/state/redux";

export default function HistoryList({ title }) {
    const dispatch = useDispatch();
    const inputState = useSelector(input.selectors.all);
    const historyState = useSelector(history.selectors.all);
    return (
        <Fragment>
            <Heading>{title}</Heading>
            {historyState.map((historyInput, i) => (
                <Link
                    onClick={() => dispatch(input.actions.update(historyInput))}
                    key={historyInput + i}
                >
                    {historyInput}
                </Link>
            ))}
        </Fragment>
    );
}

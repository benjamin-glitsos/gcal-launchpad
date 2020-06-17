import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Link } from "rebass";
import { input, history } from "~/state/redux";

export default function HistoryList() {
    const dispatch = useDispatch();
    const inputState = useSelector(input.selectors.all);
    const historyState = useSelector(history.selectors.all);
    return (
        <Fragment>
            <Heading>Recent Events</Heading>
            {historyState.map((historyInput, i) => (
                <Link
                    onClick={() => dispatch(input.actions.update(historyInput))}
                    style={{
                        fontWeight:
                            // TODO: use emotion for all styling
                            historyInput === inputState ? "bold" : "normal"
                    }}
                    key={historyInput + i}
                >
                    {historyInput}
                </Link>
            ))}
        </Fragment>
    );
}

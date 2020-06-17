import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Link } from "rebass";
import { input } from "~/state/redux";

export default function HistoryList() {
    const dispatch = useDispatch();
    const [historyState, inputState] = useSelector(state => [
        state.history,
        state.input
    ]);
    return (
        <Fragment>
            <Heading>Recent Events</Heading>
            {historyState.map((historyInput, i) => (
                <Link
                    onClick={() => dispatch(input.actions.update(historyInput))}
                    style={{
                        fontWeight:
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
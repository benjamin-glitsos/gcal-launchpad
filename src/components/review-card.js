import { useDispatch } from "react-redux";
import { Card } from "rebass";
import { Label } from "@rebass/forms";
import { input, review } from "~/state/redux";
import { cond, anyMatches } from "~/lib/utilities";
import ButtonBar from "~/components/button-bar";

export default function ReviewCard({ id, title, days, status, isSelected }) {
    const symbols = process.env.settings.symbols.review;
    const dispatch = useDispatch();
    return (
        <Card>
            <h2>
                {/* TODO: should be aware of multiple events to use plural. use pluralise package? */}
                {cond([
                    {
                        case: anyMatches([symbols.EDITING, symbols.REVIEW]),
                        return: "Create Event"
                    },
                    {
                        case: anyMatches([symbols.SENDING]),
                        return: "Sending..."
                    },
                    {
                        case: anyMatches([symbols.SEND_SUCCESS]),
                        return: "Done"
                    },
                    {
                        case: anyMatches([symbols.SEND_FAILURE]),
                        return: "Failed to Create Event"
                    },
                    {
                        case: true,
                        return: "Event"
                    }
                ])(status)}
            </h2>
            <p>{title}</p>
            {days.map(({ in: { number, period } }, i) => (
                <p key={number + period + i}>
                    <span>{(i === 0 ? "In" : "And").toUpperCase()}</span>
                    {number > 0 && <span>{number}</span>}
                    <span>{period}</span>
                </p>
            ))}
            <ButtonBar
                list={[
                    {
                        title: "Delete",
                        isDisplayed: true,
                        onClick: () =>
                            status === symbols.EDITING
                                ? [
                                      review.actions.clear(),
                                      input.actions.clear()
                                  ].forEach(dispatch)
                                : dispatch(review.actions.delete([id]))
                    },
                    {
                        title:
                            status === symbols.SEND_FAILURE
                                ? "Retry Sending"
                                : "Send",
                        isDisplayed: true,
                        onClick: () =>
                            dispatch(review.actions.send({ id, title, days }))
                    }
                ]}
            />
        </Card>
    );
}

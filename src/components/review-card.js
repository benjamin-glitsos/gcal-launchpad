import { useDispatch } from "react-redux";
import { Heading, Card } from "rebass";
import { Label } from "@rebass/forms";
import pluralise from "pluralise";
import { input, review, history } from "~/state/redux";
import { cond, anyMatches } from "~/lib/utilities";
import ButtonBar from "~/components/button-bar";

export default function ReviewCard({
    id,
    input,
    title,
    days,
    status,
    isSelected
}) {
    const symbols = process.env.settings.symbols.review;
    const dispatch = useDispatch();
    const pluraliseDays = s => pluralise(days.length, s);
    return (
        <Card>
            <Heading variant="h2">
                {cond([
                    {
                        case: anyMatches([symbols.EDITING, symbols.REVIEW]),
                        return: pluraliseDays("Create Event")
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
                        return: pluraliseDays("Failed to Create Event")
                    },
                    {
                        case: true,
                        return: pluraliseDays("Event")
                    }
                ])(status)}
            </Heading>
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
                            [
                                review.actions.send({ id, title, days }),
                                history.actions.add(input)
                            ].forEach(dispatch)
                    }
                ]}
            />
        </Card>
    );
}

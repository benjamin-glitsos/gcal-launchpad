import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Heading, Card } from "rebass";
import { Label } from "@rebass/forms";
import pluralise from "pluralise";
import { input, review, history } from "~/state/redux";
import { cond, anyMatches, isEqual } from "~/lib/utilities";
import ButtonBar from "~/components/button-bar";

const ConditionalHeading = ({ messages, status, days }) => {
    const pluraliseDays = s => pluralise(days.length, s);
    return (
        <Heading variant="h2">
            {cond([
                {
                    case: anyMatches([messages.EDITING, messages.REVIEW]),
                    return: pluraliseDays("Create Event")
                },
                {
                    case: isEqual(messages.REQUEST),
                    return: "Sending..."
                },
                {
                    case: isEqual(messages.SUCCESS),
                    return: "Done"
                },
                {
                    case: isEqual(messages.FAILURE),
                    return: pluraliseDays("Failed to Create Event")
                },
                {
                    case: true,
                    return: pluraliseDays("Event")
                }
            ])([status])}
        </Heading>
    );
};

const EventTitle = ({ title }) => <p>{title}</p>;

const DaysDisplay = ({ days }) => (
    <Fragment>
        {days.map(({ in: { number, period } }, i) => (
            <p key={number + period + i}>
                <span>{(i === 0 ? "In" : "And").toUpperCase()}</span>
                {number > 0 && <span>{number}</span>}
                <span>{period}</span>
            </p>
        ))}
    </Fragment>
);

const EventButtonBar = ({ messages, status, id, input, title, days }) => {
    const dispatch = useDispatch();
    return (
        <ButtonBar
            list={[
                {
                    title: anyMatches([status])([
                        messages.SUCCESS,
                        messages.FAILURE
                    ])
                        ? "Close"
                        : "Delete",
                    variant: "outline",
                    isDisplayed: true,
                    onClick: () =>
                        status === messages.EDITING
                            ? [
                                  review.actions.clear(),
                                  input.actions.clear()
                              ].forEach(dispatch)
                            : dispatch(review.actions.delete(id))
                },
                {
                    title:
                        status === messages.FAILURE ? "Retry Sending" : "Send",
                    variant: "primary",
                    isDisplayed: status !== messages.SUCCESS,
                    onClick: () =>
                        dispatch(
                            review.actions.send({ id, input, title, days })
                        )
                },
                {
                    title: "Open Calendar",
                    isDisplayed: status === messages.SUCCESS,
                    variant: "outline",
                    onClick: () =>
                        window.open(
                            process.env.settings.googleCalendarUrl,
                            "_blank"
                        )
                }
            ]}
        />
    );
};

export default function ReviewCard({ id, input, title, days, status }) {
    const messages = process.env.messages;
    return (
        <Card>
            <ConditionalHeading
                messages={messages}
                status={status}
                days={days}
            />
            <EventTitle title={title} />
            <DaysDisplay days={days} />
            <EventButtonBar
                messages={messages}
                status={status}
                id={id}
                input={input}
                title={title}
                days={days}
            />
        </Card>
    );
}

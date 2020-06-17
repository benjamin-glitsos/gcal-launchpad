import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Heading, Card } from "rebass";
import { Label } from "@rebass/forms";
import pluralise from "pluralise";
import { input, review, history } from "~/state/redux";
import { cond, anyMatches, isEqual } from "~/lib/utilities";
import ButtonBar from "~/components/button-bar";

const ConditionalHeading = ({ messages, days }) => {
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
            ])(status)}
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

const EventButtonBar = ({ messages, id, title, days }) => {
    const dispatch = useDispatch();
    return (
        <ButtonBar
            list={[
                {
                    title: anyMatches(
                        [status],
                        [messages.SUCCESS, messages.FAILURE]
                    )
                        ? "Close"
                        : "Delete",
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
                    isDisplayed: status !== messages.SUCCESS,
                    onClick: () =>
                        dispatch(review.actions.send({ id, title, days }))
                },
                {
                    title: "Open Calendar",
                    isDisplayed: status === messages.SUCCESS,
                    onClick: () =>
                        window.open(
                            process.env.setting.googleCalendarUrl,
                            "_blank"
                        )
                }
            ]}
        />
    );
};

export default function ReviewCard({ id, title, days, status }) {
    const messages = process.env.messages;
    return (
        <Card>
            <ConditionalHeading messages={messages} days={days} />
            <EventTitle title={title} />
            <DaysDisplay days={days} />
            <EventButtonBar
                messages={messages}
                id={id}
                title={title}
                days={days}
            />
        </Card>
    );
}

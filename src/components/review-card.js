import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Heading, Box, Text } from "rebass";
import { Label } from "@rebass/forms";
import pluralise from "pluralise";
import { input, review, history } from "~/state/redux";
import { cond, anyMatches, isEqual } from "~/lib/utilities";
import ButtonBar from "~/components/button-bar";
import Divider from "~/components/divider";
import Card from "~/components/card";

const ConditionalHeading = ({ messages, status, days }) => {
    const pluraliseDays = s => pluralise(days.length, s);
    return (
        <Heading variant="h2" color="white" fontSize={3}>
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

const EventTitle = ({ title }) => (
    <Text fontWeight="bold" fontSize={4} my={2}>
        {title}
    </Text>
);

const DaysDisplay = ({ days }) => (
    <Fragment>
        {days.map(({ in: { number, period } }, i) => (
            <Box key={number + period + i}>
                <Text
                    display="inline-block"
                    fontWeight="bold"
                    fontSize={3}
                    width={45}
                >
                    {(i === 0 ? "In" : "And").toUpperCase()}
                </Text>
                <Text display="inline-block" mr={1}>
                    {number > 0 && <span>{number}</span>}
                </Text>
                <Text display="inline-block">{period}</Text>
            </Box>
        ))}
    </Fragment>
);

const EventButtonBar = ({
    messages,
    status,
    id,
    input: inputText,
    title,
    days
}) => {
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
                    variant: "outline",
                    isDisplayed: status !== messages.SUCCESS,
                    onClick: () =>
                        dispatch(
                            review.actions.send({
                                id,
                                input: inputText,
                                title,
                                days
                            })
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
            <Divider />
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

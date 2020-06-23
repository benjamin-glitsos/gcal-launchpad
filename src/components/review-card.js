import PropTypes from "prop-types";
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

const messages = process.env.messages;

const variant = status => {
    return cond([
        {
            case: anyMatches([messages.EDITING, messages.REVIEW]),
            return: "create"
        },
        {
            case: anyMatches([messages.REQUEST]),
            return: "sending"
        },
        {
            case: anyMatches([messages.DELETED]),
            return: "deleted"
        },
        {
            case: anyMatches([messages.SUCCESS]),
            return: "done"
        },
        {
            case: anyMatches([messages.FAILURE]) || true,
            return: "error"
        }
    ])([status]);
};

const ConditionalHeading = ({ status, days }) => {
    const pluraliseDays = s => pluralise(days.length, s);
    return (
        <Heading variant="h2" color="white" fontSize={3}>
            {cond([
                {
                    case: isEqual("create"),
                    return: pluraliseDays("Create Event")
                },
                {
                    case: isEqual("sending"),
                    return: "Sending..."
                },
                {
                    case: isEqual("deleted"),
                    return: "Deleted"
                },
                {
                    case: isEqual("done"),
                    return: "Done"
                },
                {
                    case: isEqual("error"),
                    return: pluraliseDays("Error")
                },
                {
                    case: isEqual("blank") || true,
                    return: pluraliseDays("Event")
                }
            ])(variant(status))}
        </Heading>
    );
};

const EventTitle = ({ title }) => (
    <Text variant="h2" fontWeight="bold" fontSize={4} my={2} color="white">
        {title}
    </Text>
);

const DaysDisplay = ({ days }) => (
    <Fragment>
        {days.map(
            ({ in: { number, period }, date: { natural: naturalDate } }, i) => (
                <Box key={number + period + i}>
                    <Text
                        display="inline-block"
                        fontWeight="bold"
                        fontSize={3}
                        width={45}
                        color="white"
                    >
                        {(i === 0 ? "In" : "And").toUpperCase()}
                    </Text>
                    <Text display="inline-block" color="white" mr={1}>
                        {number > 0 && <span>{number}</span>}
                    </Text>
                    <Text display="inline-block" color="white" width={75}>
                        {period}
                    </Text>
                    <Text display="inline-block" color="muted" fontSize={2}>
                        ({naturalDate})
                    </Text>
                </Box>
            )
        )}
    </Fragment>
);

const EventButtonBar = ({
    status,
    id,
    countdown,
    input: inputText,
    title,
    days
}) => {
    const dispatch = useDispatch();
    return (
        <ButtonBar
            list={[
                {
                    title: "Delete",
                    variant: "cardLink",
                    isDisplayed: anyMatches([status])([
                        messages.EDITING,
                        messages.REVIEW
                    ]),
                    onClick: () => dispatch(review.actions.toDelete(id))
                },
                {
                    title: "Close",
                    variant: "cardLink",
                    isDisplayed: anyMatches([status])([
                        messages.SUCCESS,
                        messages.FAILURE
                    ]),
                    onClick: () => dispatch(review.actions.delete(id))
                },
                {
                    title: "Send",
                    variant: "cardOutline",
                    isDisplayed: anyMatches([status])([
                        messages.EDITING,
                        messages.REVIEW,
                        messages.FAILURE
                    ]),
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
                    isDisplayed: anyMatches([status])([
                        messages.REQUEST,
                        messages.SUCCESS
                    ]),
                    variant: "cardOutline",
                    onClick: () =>
                        window.open(
                            process.env.GCAL_PUBLIC_CALENDAR,
                            "_blank"
                        )
                },
                {
                    title: `Undo (${countdown})`,
                    isDisplayed: status === messages.DELETED,
                    variant: "cardOutline",
                    onClick: () => dispatch(review.actions.toReview(id))
                }
            ]}
        />
    );
};

export default function ReviewCard({
    id,
    status,
    countdown,
    input,
    title,
    days
}) {
    return (
        <Card status={variant(status)}>
            <ConditionalHeading status={status} days={days} />
            <Divider />
            <EventTitle title={title} />
            <DaysDisplay days={days} />
            <EventButtonBar
                status={status}
                countdown={countdown}
                id={id}
                input={input}
                title={title}
                days={days}
            />
        </Card>
    );
}

ReviewCard.propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    countdown: PropTypes.number.isRequired,
    input: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    days: PropTypes.arrayOf(
        PropTypes.shape({
            in: PropTypes.shape({
                number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                period: PropTypes.string.isRequired
            }),
            date: PropTypes.shape({
                international: PropTypes.string.isRequired,
                natural: PropTypes.string.isRequired
            })
        })
    )
};

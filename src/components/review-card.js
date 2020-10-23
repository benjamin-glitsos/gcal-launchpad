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
        <Heading
            variant="h2"
            fontSize={2}
            mt={0}
            mb={1}
            fontWeight="normal"
            color="white"
        >
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
    <Text
        variant="h2"
        fontWeight="bold"
        fontSize={4}
        mt={3}
        mb={2}
        color="white"
    >
        {title}
    </Text>
);

const DaysDisplay = ({ days }) => {
    const readableDateFormat = (daysCount, period, naturalDate) =>
        cond([
            {
                case: n => n === 0,
                return: "Today"
            },
            {
                case: n => n === 1,
                return: "Tomorrow"
            },
            {
                case: n => n <= 3,
                return: `in ${daysCount} days`
            },
            {
                case: n => n <= 7,
                return: period
            },
            {
                case: true,
                return: naturalDate
            }
        ])(daysCount);
    return (
        <Fragment>
            {days.map(
                (
                    { in: { number, period }, date: { natural: naturalDate } },
                    i
                ) => (
                    <Box key={number + period + i} fontSize={2}>
                        <Text
                            display="inline-block"
                            fontWeight="bold"
                            color="white"
                            mr={1}
                        >
                            {i === 0 ? "Occuring" : "And"}
                        </Text>
                        <Text display="inline-block" color="white">
                            {readableDateFormat(number, period, naturalDate)}
                        </Text>
                    </Box>
                )
            )}
        </Fragment>
    );
};

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
            justifyContent={"flex-end"}
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
                        window.open(process.env.GCAL_PUBLIC_CALENDAR, "_blank")
                },
                {
                    title: `Undo (${countdown})`,
                    isDisplayed: status === messages.DELETED,
                    variant: "cardOutline",
                    onClick: () => dispatch(review.actions.restoreDeleted(id))
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
                number: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]).isRequired,
                period: PropTypes.string.isRequired
            }),
            date: PropTypes.shape({
                international: PropTypes.string.isRequired,
                natural: PropTypes.string.isRequired
            })
        })
    )
};

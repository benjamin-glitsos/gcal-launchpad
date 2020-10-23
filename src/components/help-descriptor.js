import PropTypes from "prop-types";
import { Heading } from "rebass";
import pluralise from "pluralise";
import { review } from "~/state/redux";
import CustomTypes from "~/lib/prop-types";
import { cond } from "~/lib/utilities";

export default function HelpDescriptor({ events, ...props }) {
    const countAllEvents = events =>
        events.map(x => x.days.length).reduce((a, b) => a + b, 0);
    const activeEventsCount = countAllEvents(
        events.filter(event => event.status !== process.env.messages.DELETED)
    );
    const sendingEventsCount = countAllEvents(
        events.filter(event => event.status === process.env.messages.REQUEST)
    );
    const deletingEventsCount = countAllEvents(
        events.filter(event => event.status === process.env.messages.DELETED)
    );

    const descriptor = cond([
        {
            case: sendingEventsCount > 0,
            return: () => {
                const pluralEvent = pluralise(sendingEventsCount, "event");
                return `Sending ${sendingEventsCount} ${pluralEvent}...`;
            }
        },
        {
            case: deletingEventsCount > 0,
            return: () => {
                const pluralEvent = pluralise(deletingEventsCount, "event");
                return `Deleting ${deletingEventsCount} ${pluralEvent}...`;
            }
        },
        {
            case: activeEventsCount > 0,
            return: () => {
                const pluralEvent = pluralise(activeEventsCount, "event");
                return `Create ${activeEventsCount} ${pluralEvent}:`;
            }
        },
        {
            case: true,
            return: ""
        }
    ])(true);

    return (
        <Heading
            variant="h3"
            textAlign={["center", "left"]}
            {...props}
            sx={{
                fontSize: 3,
                fontWeight: "bold",
                color: "text"
            }}
        >
            {descriptor}
        </Heading>
    );
}

HelpDescriptor.propTypes = {
    events: CustomTypes.days.isRequired
};

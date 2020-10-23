import { Heading } from "rebass";
import { useSelector } from "react-redux";
import pluralise from "pluralise";
import { review } from "~/state/redux";
import { cond } from "~/lib/utilities";

export default function HelpDescriptor({ ...props }) {
    const events = useSelector(review.selectors.events);
    const allActiveEventsCount = events.filter(
        event => event.status !== process.env.messages.DELETED
    ).length;

    const descriptor = cond([
        {
            case: n => n > 0,
            return: () => {
                const pluralEvent = pluralise(allActiveEventsCount, "event");
                return `Create ${allActiveEventsCount} ${pluralEvent}.`;
            }
        },
        {
            case: true,
            return: ""
        }
    ])(allActiveEventsCount);

    return (
        <Heading
            {...props}
            sx={{
                fontSize: 3,
                pt: 1,
                fontWeight: "bold",
                color: "text"
            }}
        >
            {descriptor}
        </Heading>
    );
}

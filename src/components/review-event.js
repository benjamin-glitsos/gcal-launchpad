import { useDispatch } from "react-redux";
import { useUpdater } from "redux-lightweight";
import { Card, Button } from "rebass";
import { Label, Checkbox } from "@rebass/forms";
import { review } from "~/state/redux";
import { cond, anyMatches } from "~/lib/utilities";

export default function ReviewCard({ id, title, days, status, isSelected }) {
    const dispatch = useDispatch();
    const symbols = process.env.settings.symbols.review;
    return (
        <Card>
            <h2>
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
            <ul>
                <li>id: {id}</li>
                <li>title: {title}</li>
                <li>days: {days.toString()}</li>
                <li>status: {status}</li>
            </ul>
            <Button onClick={() => dispatch(review.actions.delete([id]))}>
                Delete
            </Button>
            <Button
                onClick={() =>
                    dispatch(review.actions.send({ id, title, days }))
                }
            >
                Send
            </Button>
        </Card>
    );
}

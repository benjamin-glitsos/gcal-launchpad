import { useDispatch } from "react-redux";
import { Card, Button } from "rebass";
import { reviewActions } from "~/state/redux";

export default function ReviewCard({ id, title, days, status }) {
    const dispatch = useDispatch();
    return (
        <Card>
            <ul>
                <li>id</li>
                <li>title</li>
                <li>days</li>
                <li>status</li>
            </ul>
            <Button
                onClick={dispatch(
                    reviewActions.update[(id, { title: "updated title" })]
                )}
            >
                Update some data
            </Button>
            <Button onClick={dispatch(reviewActions.delete([id]))}>
                Delete
            </Button>
        </Card>
    );
}

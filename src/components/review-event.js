import { useDispatch } from "react-redux";
import { Card, Button } from "rebass";
import { reviewActions } from "~/state/redux";

export default function ReviewCard({ id, title, days, status }) {
    const dispatch = useDispatch();
    return (
        <Card>
            <ul>
                <li>id: {id}</li>
                <li>title: {title}</li>
                <li>days: {days.toString()}</li>
                <li>status: {status}</li>
            </ul>
            <Button onClick={() => dispatch(reviewActions.deleteAll())}>
                Delete All
            </Button>
            <Button onClick={() => dispatch(reviewActions.delete([id]))}>
                Delete
            </Button>
            <Button
                onClick={() =>
                    dispatch(
                        reviewActions.update(id, {
                            title: "updated title",
                            days: ["10-10-10", "20-20-20"]
                        })
                    )
                }
            >
                Update some data
            </Button>
            <Button onClick={() => dispatch(reviewActions.send([id]))}>
                Send
            </Button>
            <Button onClick={() => dispatch(reviewActions.sendAll())}>
                Send All
            </Button>
        </Card>
    );
}

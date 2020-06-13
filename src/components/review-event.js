import { useDispatch } from "react-redux";
import { useUpdater } from "redux-lightweight";
import { Card, Button } from "rebass";
import { Label, Checkbox } from "@rebass/forms";
import { review } from "~/state/redux";

export default function ReviewCard({ id, title, days, status, isSelected }) {
    const dispatch = useDispatch();
    return (
        <Card>
            {/* TODO: make this use cond so that it displays a different heading per status code */}
            <h2>Create Event</h2>
            <ul>
                <li>id: {id}</li>
                <li>title: {title}</li>
                <li>days: {days.toString()}</li>
                <li>status: {status}</li>
            </ul>
            <Label>
                <Checkbox
                    onClick={() => dispatch(review.actions.toggleSelect(id))}
                />
                Toggle Selected
            </Label>
            <Button
                onClick={() => dispatch(review.actions.manuallyCreateNew())}
            >
                Manually Create New
            </Button>
            <Button onClick={() => dispatch(review.actions.deleteAll())}>
                Delete All
            </Button>
            <Button onClick={() => dispatch(review.actions.delete([id]))}>
                Delete
            </Button>
            <Button
                onClick={() =>
                    dispatch(
                        review.actions.update(id, {
                            title: "updated title",
                            days: ["10-10-10", "20-20-20"]
                        })
                    )
                }
            >
                Update some data
            </Button>
            <Button
                onClick={() =>
                    dispatch(
                        review.actions.send({ id, title, date: "2020-06-14" })
                    )
                }
            >
                Send
            </Button>
        </Card>
    );
}

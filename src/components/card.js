import { Card as RebassCard } from "rebass";
import { cond, isEqual } from "~/lib/utilities";

export default function Card(props) {
    const status = props.status;
    console.log(status);
    return (
        <RebassCard
            {...props}
            sx={{
                borderRadius: "card",
                p: 3,
                color: status === "blank" ? "white" : "text",
                bg: cond([
                    {
                        case: isEqual("create"),
                        return: "primary"
                    },
                    {
                        case: isEqual("sending"),
                        return: "yellow"
                    },
                    {
                        case: isEqual("done"),
                        return: "green"
                    },
                    {
                        case: isEqual("error"),
                        return: "red"
                    },
                    {
                        case: isEqual("blank") || true,
                        return: "white"
                    }
                ])(status)
            }}
        />
    );
}

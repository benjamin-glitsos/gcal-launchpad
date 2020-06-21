import { Card as RebassCard } from "rebass";

export default function Card(props) {
    return (
        <RebassCard
            {...props}
            sx={{
                borderRadius: "card",
                backgroundColor: "primary",
                color: "white"
            }}
        />
    );
}

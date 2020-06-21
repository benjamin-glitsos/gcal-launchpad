import { Box } from "rebass";

export default function Divider(props) {
    return (
        <Box
            {...props}
            as="hr"
            sx={{
                bg: "muted",
                border: 0,
                height: 1,
                mb: 2
            }}
        />
    );
}

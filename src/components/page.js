import { Box } from "rebass";

export default function Page(props) {
    return (
        <Box
            {...props}
            sx={{
                maxWidth: ["auto", 1000],
                mx: "auto"
            }}
        />
    );
}

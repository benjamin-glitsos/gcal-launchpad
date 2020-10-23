import { Box } from "rebass";

export default function Page(props) {
    return (
        <Box
            sx={{
                maxWidth: ["auto", 1000],
                mx: "auto"
            }}
        >
            <Box
                {...props}
                sx={{
                    mx: 3
                }}
            />
        </Box>
    );
}

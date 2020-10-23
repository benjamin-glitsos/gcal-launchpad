import { Box } from "rebass";

export default function PatternBackground(props) {
    return (
        <Box {...props} sx={{ backgroundImage: "url(/pattern-tile.svg)" }} />
    );
}

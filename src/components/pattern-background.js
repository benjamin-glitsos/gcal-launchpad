import React from "react";
import { Box } from "rebass";

export default function PatternBackground(props) {
    return (
        <Box
            {...props}
            sx={{ backgroundImage: "url(/star-pattern-tile.svg)" }}
        />
    );
}

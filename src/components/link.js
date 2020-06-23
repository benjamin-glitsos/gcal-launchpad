import PropTypes from "prop-types";
import { Link as RebassLink } from "rebass";

export default function Link(props) {
    return (
        <RebassLink
            target="_blank"
            {...props}
            sx={{
                "cursor": "pointer",
                "textDecoration": "none",
                "&:hover": {
                    textDecoration: "underline"
                }
            }}
        />
    );
}

Link.PropTypes = PropTypes.object;

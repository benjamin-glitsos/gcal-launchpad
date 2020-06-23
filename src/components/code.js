import PropTypes from "prop-types";
import { Text } from "rebass";

export default function Code(props) {
    const type = props.type || "code";
    return (
        <Text
            {...props}
            as={type}
            sx={{
                fontFamily: "monospace",
                fontSize: 2,
                bg: "muted",
                overflowX: "auto",
                px: type === "pre" ? 3 : 1,
                py: type === "pre" ? 2 : 1
            }}
        />
    );
}

Code.propTypes = PropTypes.object.isRequired;

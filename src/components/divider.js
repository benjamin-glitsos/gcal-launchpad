import PropTypes from "prop-types";
import { Box } from "rebass";

export default function Divider(props) {
    const color = props.color;
    return (
        <Box
            {...props}
            as="hr"
            sx={{
                bg: props.color || "muted",
                border: 0,
                height: 1,
                mb: 2
            }}
        />
    );
}

Divider.propTypes = PropTypes.object;

import PropTypes from "prop-types";
import { Fragment } from "react";

export default function ConditionalWrap({ condition, wrap, children }) {
    return condition ? wrap(children) : <Fragment>{children}</Fragment>;
}

ConditionalWrap.propTypes = PropTypes.shape({
    condition: PropTypes.bool.isRequired,
    wrap: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired
});

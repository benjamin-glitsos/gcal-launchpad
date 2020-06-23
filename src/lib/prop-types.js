import PropTypes from "prop-types";

var CustomTypes = {};

CustomTypes.numberOrMultiple = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
]);

CustomTypes.stringOrMultiple = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
]);

export default CustomTypes;

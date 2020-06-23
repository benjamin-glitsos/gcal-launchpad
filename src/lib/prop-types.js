import PropTypes from "prop-types";

const CustomTypes = {};

CustomTypes.numberOrMultiple = PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
]);

export default CustomTypes;

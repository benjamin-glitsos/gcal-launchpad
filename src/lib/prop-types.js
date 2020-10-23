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

CustomTypes.days = PropTypes.arrayOf(
    PropTypes.shape({
        in: PropTypes.shape({
            number: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            period: PropTypes.string.isRequired,
            totalDays: PropTypes.number.isRequired
        }),
        date: PropTypes.shape({
            international: PropTypes.string.isRequired,
            natural: PropTypes.string.isRequired
        })
    })
);

export default CustomTypes;

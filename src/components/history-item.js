import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { input, review } from "~/state/redux";
import { Heading, Flex, Box } from "rebass";
import Link from "~/components/link";

export default function HistoryItem({ title }) {
    const dispatch = useDispatch();
    return (
        <Link
            onClick={() =>
                [
                    review.actions.new(),
                    input.actions.update(title),
                    review.actions.parse(title)
                ].forEach(dispatch)
            }
            color="text"
        >
            {title}
        </Link>
    );
}

HistoryItem.propTypes = {
    title: PropTypes.string.isRequired
};

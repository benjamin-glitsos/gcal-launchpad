import PropTypes from "prop-types";
import { Flex, Box } from "rebass";
import ConditionalWrap from "~/components/conditional-wrap";

const Bullet = children => (
    <ul style={{ marginTop: 2, marginBottom: 2 }}>
        <li>{children}</li>
    </ul>
);

Bullet.propTypes = PropTypes.node.isRequired;

export default function ColumnList({ width, py, hasBullets, children }) {
    return (
        <Flex width={1} flexWrap="wrap">
            {children.map((Child, i) => (
                <Box key={"column list item" + i} width={width} py={py}>
                    <ConditionalWrap condition={hasBullets} wrap={Bullet}>
                        {Child}
                    </ConditionalWrap>
                </Box>
            ))}
        </Flex>
    );
}

ColumnList.propTypes = PropTypes.shape({
    width: PropTypes.number.isRequired,
    py: PropTypes.number.isRequired,
    hasBullets: PropTypes.bool.isRequired,
    hasBullets: PropTypes.node.isRequired
});

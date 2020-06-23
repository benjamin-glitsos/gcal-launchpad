import PropTypes from "prop-types";
import { Flex, Box } from "rebass";
import ConditionalWrap from "~/components/conditional-wrap";
import CustomTypes from "~/lib/prop-types";

const Bullet = children => (
    <ul style={{ marginTop: 2, marginBottom: 2 }}>
        <li>{children}</li>
    </ul>
);

Bullet.propTypes = PropTypes.node.isRequired;

export default function ColumnList({ width, py, textAlign, hasBullets, children }) {
    return (
        <Flex width={1} flexWrap="wrap">
            {children.map((Child, i) => (
                <Box key={"column list item" + i} width={width} py={py} textAlign={textAlign || "left"}>
                    <ConditionalWrap condition={hasBullets} wrap={Bullet}>
                        {Child}
                    </ConditionalWrap>
                </Box>
            ))}
        </Flex>
    );
}

ColumnList.propTypes = {
    width: CustomTypes.numberOrMultiple.isRequired,
    py: CustomTypes.numberOrMultiple.isRequired,
    textAlign: CustomTypes.stringOrMultiple,
    hasBullets: PropTypes.bool,
    children: PropTypes.node.isRequired
};

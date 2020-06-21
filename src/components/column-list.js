import { Flex, Box } from "rebass";
import ConditionalWrap from "~/components/conditional-wrap";

const Bullet = children => (
    <ul>
        <li>{children}</li>
    </ul>
);

export default function ColumnList({ width, hasBullets, children }) {
    return (
        <Flex width={1} flexWrap="wrap">
            {children.map((Child, i) => (
                <Box width={width}>
                    <ConditionalWrap condition={hasBullets} wrap={Bullet}>
                        {Child}
                    </ConditionalWrap>
                </Box>
            ))}
        </Flex>
    );
}

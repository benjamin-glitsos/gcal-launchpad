import PropTypes from "prop-types";
import { Button, Flex, Box } from "rebass";
import CustomTypes from "~/lib/prop-types"

export default function ButtonBar({ justifyContent, list }) {
    return (
        <Flex justifyContent={justifyContent || "flex-end"}>
            {list
                .filter(({ isDisplayed }) => isDisplayed)
                .map(({ title, variant, onClick }, i) => (
                    <Box key={i + title} px={1}>
                        <Button variant={variant} onClick={onClick}>
                            {title}
                        </Button>
                    </Box>
                ))}
        </Flex>
    );
}

ButtonBar.propTypes = {
    justifyContent: CustomTypes.stringOrMultiple,
    list: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            isDisplayed: PropTypes.bool.isRequired,
            variant: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired
        })
    )
};

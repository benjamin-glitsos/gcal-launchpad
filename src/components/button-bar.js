import PropTypes from "prop-types";
import { Button, Flex, Box } from "rebass";

export default function ButtonBar({ list }) {
    return (
        <Flex justifyContent="flex-end">
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
    list: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            isDisplayed: PropTypes.bool.isRequired,
            variant: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired
        })
    )
};

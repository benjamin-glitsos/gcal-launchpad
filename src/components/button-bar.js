import { Button, Flex, Box } from "rebass";

export default function ButtonBar({ list }) {
    return (
        <Flex justifyContent="flex-end">
            <Box mx={-1}>
                {list
                    .filter(({ isDisplayed }) => isDisplayed)
                    .map(({ title, variant, onClick }, i) => (
                        <Button
                            mx={1}
                            variant={variant}
                            onClick={onClick}
                            key={i + title}
                        >
                            {title}
                        </Button>
                    ))}
            </Box>
        </Flex>
    );
}

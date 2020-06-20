import { Button, Box } from "rebass";

export default function ButtonBar({ list }) {
    return (
        <Box textAlign="right">
            {list
                .filter(({ isDisplayed }) => isDisplayed)
                .map(({ title, variant, onClick }, i) => (
                    <Button variant={variant} onClick={onClick} key={i + title}>
                        {title}
                    </Button>
                ))}
        </Box>
    );
}

import { Button } from "rebass";

export default function ButtonBar({ list }) {
    return list
        .filter(({ isDisplayed }) => isDisplayed)
        .map(({ title, onClick }, i) => (
            <Button onClick={onClick} key={i + title}>
                {title}
            </Button>
        ));
}

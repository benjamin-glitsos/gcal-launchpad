import { Button } from "rebass";

export default function ButtonBar({ list }) {
    return list
        .filter(({ isDisplayed }) => isDisplayed)
        .map(({ title, onClick }) => (
            <Button onClick={onClick}>{title}</Button>
        ));
}

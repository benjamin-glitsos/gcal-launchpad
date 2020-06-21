import { Fragment } from "react";

export default function ConditionalWrap({ condition, wrap, children }) {
    return condition ? wrap(children) : <Fragment>{children}</Fragment>;
}

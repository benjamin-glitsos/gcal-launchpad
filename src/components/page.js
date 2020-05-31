import Link from "next/link";
import { useSelector } from "react-redux";

import Counter from "./counter";

function Page({ linkTo, NavigateTo, title }) {
    const history = useSelector(state => state.history);
    const error = useSelector(state => state.error);
    const light = useSelector(state => state.light);
    const lastUpdate = useSelector(state => state.lastUpdate);
    return (
        <div>
            <h1>{title}</h1>
            <Counter />
            <nav>
                <Link href={linkTo}>
                    <a>Navigate: {NavigateTo}</a>
                </Link>
            </nav>
            {history && (
                <pre>
                    <code>{JSON.stringify(history, null, 2)}</code>
                </pre>
            )}
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        </div>
    );
}

export default Page;

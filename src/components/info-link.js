import { useDispatch, useSelector } from "react-redux";
import { Link } from "rebass";
import { info } from "~/state/redux/index";

export default function InfoLink({ title }) {
    const dispatch = useDispatch();
    return <Link onClick={() => dispatch(info.actions.toggle())}>{title}</Link>;
}

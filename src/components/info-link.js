import { useDispatch, useSelector } from "react-redux";
import { Link } from "rebass";
import { popup } from "~/state/redux/index";

export default function InfoLink() {
    const dispatch = useDispatch();
    return <Link onClick={() => dispatch(popup.actions.popup())}>Info</Link>;
}

import { useDispatch, useSelector } from "react-redux";
import { Card } from "rebass";
import { popup } from "~/state/redux/index";
import Info from "~/components/info.mdx";
import ButtonBar from "~/components/button-bar";

export default function InfoPopup({ title }) {
    const isShown = useSelector(popup.selectors.isShown);
    const dispatch = useDispatch();
    return (
        isShown && (
            <Card>
                <Info />
                <ButtonBar
                    list={[
                        {
                            title: "Close",
                            isDisplayed: true,
                            onClick: () => dispatch(popup.actions.hide())
                        }
                    ]}
                />
            </Card>
        )
    );
}

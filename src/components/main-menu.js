import { useDispatch, useSelector } from "react-redux";
import ButtonBar from "~/components/button-bar";
import { info } from "~/state/redux/index";

export default function MainMenu() {
    const dispatch = useDispatch();
    return (
        <ButtonBar
            list={[
                {
                    title: "Calendar",
                    isDisplayed: true,
                    variant: "link",
                    onClick: () =>
                        window.open(
                            process.env.GCAL_PUBLIC_CALENDAR,
                            "_blank"
                        )
                },
                {
                    title: "Info",
                    isDisplayed: true,
                    variant: "link",
                    onClick: () => dispatch(info.actions.toggle())
                }
            ]}
        />
    );
}

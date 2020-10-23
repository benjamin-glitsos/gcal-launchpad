import { useDispatch, useSelector } from "react-redux";
import ButtonBar from "~/components/button-bar";
import { info } from "~/state/redux/index";

export default function MainMenu() {
    const dispatch = useDispatch();
    return (
        <ButtonBar
            justifyContent={["center", "flex-end"]}
            list={[
                {
                    title: "Readme",
                    isDisplayed: true,
                    variant: "link",
                    onClick: () => dispatch(info.actions.toggle())
                },
                {
                    title: "Github",
                    isDisplayed: true,
                    variant: "link",
                    onClick: () =>
                        window.open(
                            "https://github.com/benjamin-glitsos/gcal-launchpad",
                            "_blank"
                        )
                },
                {
                    title: "Calendar",
                    isDisplayed: true,
                    variant: "link",
                    onClick: () =>
                        window.open(process.env.GCAL_PUBLIC_CALENDAR, "_blank")
                }
            ]}
        />
    );
}

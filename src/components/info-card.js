import { useDispatch, useSelector } from "react-redux";
import { Flex, Box, Card } from "rebass";
import { info } from "~/state/redux/index";
import Info from "~/components/info.mdx";
import ButtonBar from "~/components/button-bar";

export default function InfoCard() {
    const isShown = useSelector(info.selectors.isShown);
    const dispatch = useDispatch();
    return (
        isShown && (
            <Flex my={2}>
                <Box width={1}>
                    <Card>
                        <Info />
                        <ButtonBar
                            list={[
                                {
                                    title: "Close",
                                    isDisplayed: true,
                                    onClick: () => dispatch(info.actions.hide())
                                }
                            ]}
                        />
                    </Card>
                </Box>
            </Flex>
        )
    );
}

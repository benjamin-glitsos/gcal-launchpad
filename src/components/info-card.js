import { useDispatch, useSelector } from "react-redux";
import { Flex, Box } from "rebass";
import { info } from "~/state/redux/index";
import Info from "~/components/info.mdx";
import ButtonBar from "~/components/button-bar";
import Card from "~/components/card";

export default function InfoCard() {
    const isShown = useSelector(info.selectors.isShown);
    const dispatch = useDispatch();
    return (
        isShown && (
            <Flex mt={4}>
                <Box>
                    <Card my={2}>
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

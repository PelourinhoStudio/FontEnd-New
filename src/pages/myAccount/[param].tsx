import {
    Flex,
    Grid,
    GridItem,
    Text
} from "@chakra-ui/react";
import { useRouter } from "next/router"
import { AccountDetails } from "../../components/accountDetails/accountDetails";
import { AccountInfoComp } from "../../components/accountInfoComp/accountInfoComp";
import { Buttons } from "../../components/buttons/buttons";
import { MyGalleryComp } from "../../components/myGalleryComp/myGalleryComp";
import { UploadImageForm } from "../../components/uploadImageForm/uploadImageForm";
import { WhiteArea } from "../../components/whiteArea/whiteArea";

export default function Param() {

    const router = useRouter()
    let { param } = router.query

    return (
        <>
            <Grid templateColumns='repeat(6, 1fr)' h="calc(100vh - 124px)">
                <GridItem colSpan={2}>
                    <Grid templateRows='repeat(2, 1fr)' h="100%">
                        <GridItem h="100%">
                            <Flex justify="center" align="center" h="100%" w="100%">
                                <AccountInfoComp />
                            </Flex>
                        </GridItem>
                        <GridItem h="100%">
                            <Flex justify="center" align="center" h="100%" w="100%">
                                <Buttons />
                            </Flex>
                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem colSpan={4}>
                    <WhiteArea>
                        {
                            param == 'uploadImage' && <UploadImageForm />
                        }
                        {
                            param == 'accountDetails' && <AccountDetails />
                        }
                        {
                            param == 'myGallery' && <MyGalleryComp />
                        }
                    </WhiteArea>
                </GridItem>
            </Grid>

        </>
    )
}

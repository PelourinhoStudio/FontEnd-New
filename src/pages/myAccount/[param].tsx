import { Container, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AccountDetails } from "../../components/accountDetails/accountDetails";
import { AccountInfoComp } from "../../components/accountInfoComp/accountInfoComp";
import { Buttons } from "../../components/buttons/buttons";
import { MyGalleryComp } from "../../components/myGalleryComp/myGalleryComp";
import { UploadImageForm } from "../../components/uploadImageForm/uploadImageForm";
import { WhiteArea } from "../../components/whiteArea/whiteArea";

export default function Param() {
  const router = useRouter();
  let { param } = router.query;

  return (
    <>
      <Container maxW='full'>
        {param == "uploadImage" && <UploadImageForm />}
        {param == "accountDetails" && <AccountDetails />}
        {param == "myGallery" && <MyGalleryComp />}
      </Container>
    </>
  );
}

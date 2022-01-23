import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { AccountDetails } from "../../components/accountDetails/accountDetails";
import { MyGallery } from "../../components/myGallery/myGallery";
import { UploadImageForm } from "../../components/uploadImageForm/uploadImageForm";
import Favorites from "../favorites";

export default function Param() {

  const router = useRouter();
  let { param } = router.query;
  const { "studio.token": token } = parseCookies();

  useEffect(() => {
    if (!token) {
      router.push('/')
    }
  }, [])

  return (
    <>
      <Container maxW='full'>
        {param == "uploadImage" && <UploadImageForm />}
        {param == "accountDetails" && <AccountDetails />}
        {param == "myGallery" && <MyGallery />}
        {param == "favorites" && <Favorites />}
      </Container>
    </>
  );
}

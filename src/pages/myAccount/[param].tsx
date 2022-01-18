import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { AccountDetails } from "../../components/accountDetails/accountDetails";
import { GalleryComp } from "../../components/GalleryComp";
import { UploadImageForm } from "../../components/uploadImageForm/uploadImageForm";
import { api } from "../../services/api";

export default function Param() {
  const router = useRouter();
  let { param } = router.query;
  const [images, setImages] = useState([]);
  const { "studio.token": token } = parseCookies();

  useEffect(() => {
    api
      .get("/me/images", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setImages(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
  }, []);

  return (
    <>
      <Container maxW='full'>
        {param == "uploadImage" && <UploadImageForm />}
        {param == "accountDetails" && <AccountDetails />}
        {param == "myGallery" && <GalleryComp imageList={images} />}
      </Container>
    </>
  );
}

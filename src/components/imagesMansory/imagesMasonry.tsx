import { Box, Image, useDisclosure } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { ImageModal } from "../imageModal/imageModal";

type Image = {
  imageCDN: string;
  _id: string;
};

export function ImagesMasonry({ data }: any) {
  const [images, setImages] = useState([]);

  const [imagesID, setImagesID] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    api
      .get("/images")
      .then((response) => setImages(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
  }, []);

  function openImage(url: any) {
    onOpen();
    setImagesID(url);
  }

  return (
    <>
      <Image src={"/image.png"} w='100%' h='100%' maxH='700px' alt='image' />
      <Box
        padding={4}
        w='100%'
        mx='auto'
        sx={{ columnCount: [1, 2, 3, 4, 5], columnGap: "8px" }}>
        {images.map((image: Image) => {
          return (
            <Image
              key='image'
              src={image.imageCDN}
              alt='image'
              borderRadius='10px'
              w='100%'
              d='inline-block'
              cursor='pointer'
              onClick={() => openImage(image._id)}
            />
          );
        })}
      </Box>
      <ImageModal isOpen={isOpen} onClose={onClose} onOpen id={imagesID} />
    </>
  );
}

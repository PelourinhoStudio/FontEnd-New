import { Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { GalleryComp } from "../GalleryComp";


export function MyGallery() {

  const [images, setImages] = useState([]);
  const { "studio.token": token } = parseCookies();
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    api
      .get("/me/images", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((response) => {
        setImages(response.data)
        setLoaded(true)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
  }, []);

  return (
    <>
      {
        !loaded ? (
          <Flex
            w="100%"
            h="calc(100vh - 124px)"
            align="center"
            justify="center"
          >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Flex>
        ) : (
          <>
            <Center>
              <Heading textTransform={"capitalize"}>Minha Galeria</Heading>
            </Center >
            <GalleryComp imageList={images} />
          </>
        )
      }
    </>
  )
}
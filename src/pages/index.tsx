import { Box, Flex, Spinner } from "@chakra-ui/react";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { GalleryComp } from "../components/GalleryComp";
import { api } from "../services/api";

const Home: NextPage = () => {
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    api
      .get("/images")
      .then((response) => {
        setImages(response.data)
        setLoaded(true)
      }
      )
      .catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
  }, []);

  return (
    <>
      {
        !loaded ? (
          <>
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
          </>
        ) : (
          <>
            <GalleryComp imageList={images} haveHeader={true} />
          </>
        )
      }
    </>
  );
};

export default Home;

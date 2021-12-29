import { Box, Flex, IconButton, Image, Spacer, Text } from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

type Image = {
  imageCDN: string;
  _id: string;
};

export function MyGalleryComp() {
  const [images, setImages] = useState([]);
  const { "studio.token": token } = parseCookies();

  let config = {
    headers: {
      "x-access-token": token,
    },
  };

  useEffect(() => {
    api
      .get("/images", config)
      .then((response) => setImages(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro " + err);
      });
  }, []);

  const handleHover = () => {
    console.log("hover");
  };

  return (
    <>
      <Box
        padding={4}
        w='100%'
        mx='auto'
        sx={{ columnCount: { base: 1, md: 2, lg: 3, xl: 4 }, columnGap: "2" }}>
        {images.map((image: Image) => {
          // return box with image inside and display image info on hover

          return (
            <>
              <Box
                zIndex={1000}
                onHover={handleHover}
                _hover={{
                  opacity: 0.9,
                  transition: "transform 0.2s",
                }}
                position='relative'
                className='info'>
                <Box
                  position='absolute'
                  width='100%'
                  bottom='4'
                  px='4'
                  display='none'
                  sx={{
                    ".info:hover &": {
                      display: "initial",
                    },
                  }}>
                  <Flex>
                    <Text>autor</Text>
                    <Spacer />
                    <IconButton aria-label='like' icon={<AiOutlineLike />} />
                  </Flex>
                </Box>
                <Image
                  key='image'
                  src={image.imageCDN}
                  alt='image'
                  borderRadius='10px'
                  w='100%'
                  d='inline-block'
                  cursor='pointer'

                  // onClick={() => openImage(image._id)}
                />
              </Box>
            </>
          );
        })}
      </Box>
    </>
  );
}

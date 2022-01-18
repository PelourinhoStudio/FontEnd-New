import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { ImageModal } from "./imageModal/imageModal";

type Author = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

type Image = {
  _id: string;
  title: string;
  description: string;
  category: string[];
  tags: string[];
  price: number;
  year: Date;
  imageType: string;
  imageCDN: string;
  likedBy: string[];
  likes: number;
  author: Author;
};

export function GalleryComp({ imageList }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imagesID, setImagesID] = useState();

  const { "studio.token": token } = parseCookies();

  function openImage(url: any) {
    onOpen();
    setImagesID(url);
  }

  const handleLike = (id: string) => {
    api.put(
      `/me/images/like/${id}`,
      {},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
  };

  return (
    <>
      {/* {haveHeader && (
        <Image src={"/image.png"} w='100%' h='100%' maxH='700px' alt='image' objectFit={"cover"} />
      )} */}
      <Box
        padding={4}
        w='100%'
        mx='auto'
        sx={{ columnCount: { base: 1, md: 2, lg: 3, xl: 4 }, columnGap: "2" }}>
        {imageList.map((image: Image) => {
          // return box with image inside and display image info on hover
          return (
            <>
              <Box
                zIndex={1000}
                _hover={{
                  opacity: 0.9,

                  transition: "transform 0.2s",
                }}
                position='relative'
                className='info'>
                <Box
                  zIndex={1001}
                  borderRadius='8'
                  p='4'
                  position='absolute'
                  width='100%'
                  bottom='1.5'
                  display='none'
                  sx={{
                    ".info:hover &": {
                      display: "initial",
                      color: "#F7FAFC",
                      background: "linear-gradient(to top, #111, transparent);",
                    },
                  }}>
                  <Flex alignItems='center'>
                    <Avatar mr='2' src={image.author.avatar} />

                    <Text>
                      {image.author.firstName + " " + image.author.lastName}
                    </Text>
                    <Spacer />

                    <IconButton
                      onClick={() => handleLike(image._id)}
                      size='sm'
                      variant='unstyled'
                      fontSize='2xl'
                      aria-label='like'
                      icon={<AiOutlineLike />}
                    />
                    <Text mr='2'>{image.likes}</Text>
                  </Flex>
                </Box>
                <Image
                  borderRadius='8'
                  key='image'
                  src={image.imageCDN}
                  alt='image'
                  w='100%'
                  d='inline-block'
                  cursor='pointer'
                  onClick={() => openImage(image._id)}
                />
              </Box>
            </>
          );
        })}
      </Box>
      <ImageModal isOpen={isOpen} onClose={onClose} onOpen id={imagesID} />
    </>
  );
}

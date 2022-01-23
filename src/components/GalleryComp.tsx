import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { AiOutlineLike, AiOutlineDislike, AiOutlineSearch } from "react-icons/ai";
import { ImageModal } from "./imageModal/imageModal";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

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

export function GalleryComp({ imageList, haveHeader }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imagesID, setImagesID] = useState();
  const { isAuthenticated } = useContext(AuthContext)
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm();

  const { "studio.token": token } = parseCookies();

  function openImage(url: any) {
    onOpen();
    setImagesID(url);
  }

  const handleLike = (id: string) => {
    if (isAuthenticated) {
      api.put(
        `/me/images/like/${id}`,
        {},
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
    } else {
      router.push('/login')
    }
  };

  const onSubmit = (data: any) => {
    let tags = data.tags.split(",").join();

    router.push({
      pathname: "/search",
      query: {
        tags,
      },
    });
  };

  return (
    <>
      {haveHeader && (
        <>
          <Flex position={"relative"} w="100%" h="700px" justify="center">
            <Center>
              <Box zIndex={1000} textAlign={"center"}>
                <Heading color="#FFF" zIndex={1000} fontSize={"100px"} >
                  Pelourinho Studio
                </Heading>
                <Text color="#FFF" fontSize={"30px"} my="40px">
                  Melhor Galeria do Mundo!!!
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputGroup zIndex={1000}>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineSearch />}
                    />
                    <Input
                      {...register("tags")}
                      placeholder="Pesquisar por tags, divididas por ','"
                      bgColor='#E8E8E8'
                      borderRadius='60px'
                      w='100%'
                    />
                  </InputGroup>
                </form>
              </Box>
            </Center>
            <Image src={"/image2.jpg"} w='100%' h='100%' alt='image' objectFit={"cover"} position={"absolute"} bgColor={"#000"} style={{ filter: "brightness(0.7)" }} />
          </Flex>
        </>
      )}
      <Box
        padding={4}
        w='100%'
        mx='auto'
        sx={{ columnCount: { base: 1, md: 2, lg: 3, xl: 4 }, columnGap: "2" }}>
        {imageList?.map((image: Image) => {
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
                    <Avatar mr='2' src={image.author?.avatar} />
                    <Text>
                      {image.author?.firstName + " " + image.author?.lastName}
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

import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  Center
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { api } from "../../services/api";
import { FavoriteButton } from "../favoriteButton/favoriteButton";

export function ImageModal({ isOpen, open, onClose, id }: any) {
  const { "studio.token": token } = parseCookies();
  const [image, setImage]: any = useState({});
  const [tags, setTags]: any = useState([]);
  const [categories, setCategories]: any = useState([]);

  useEffect(() => {
    if (isOpen != false) {
      api
        .get("/image/" + id, {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          setImage(res.data);
          setTags(res.data.tags)
          setCategories(res.data.category)
        });
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW='96rem' h='70rem' mx='16'>
          <Center>
            <Image
              src={image.imageCDN}
              objectFit='cover'
              h='600px'
              mt="10px"
            />
          </Center>
          <Flex mx='20px' mt='20px' justify='space-between'>
            <Flex>
              <Avatar src='https://github.com/diogosousa17.png' />
              <Box mx='10px'>
                <Text fontWeight='medium'>Diogo Sousa</Text>
                <Text fontSize='small'>Designer</Text>
              </Box>
            </Flex>
            <FavoriteButton id={id}/>
          </Flex>
          <Flex justify='space-between' mx='20px'>
            <Text fontSize='4xl'>{image.title}</Text>
            <Text fontSize='4xl'>{image.price}€</Text>
          </Flex>
          <Text mx='20px' textAlign='justify' mt='2'>
            {image.description}
          </Text>
          <Flex>
            <Text fontWeight='medium' ml='20px' mt='20px'>
              Categoria:
            </Text>
            {
              categories.map((category: any) => <Text mx='2' mt='20px' textTransform={"capitalize"}>{category}</Text>)
            }
          </Flex>
          <Flex>
            <Text fontWeight='medium' ml='20px' mt='20px'>
              Tipo de Imagem:
            </Text>
            <Text mx='2' mt='20px' textTransform={"capitalize"}>
              {image.imageType}
            </Text>
          </Flex>
          <Flex>
            <Text fontWeight='medium' ml='20px' mt='20px'>
              Ano:
            </Text>
            <Text mx='2' mt='20px'>
              {image.year}
            </Text>
          </Flex>
          <Flex align='flex-end' h='100%'>
            <Divider borderWidth='1' borderColor='#000' />
          </Flex>
          <Flex mx='20px' justify='flex-end' h='100%' flexDirection='column'>
            <Text fontWeight='medium'>Tags:</Text>
            <SimpleGrid columns={10} spacing={5} w='100%'>
              {
                tags.map((tag: any) => (
                  <Box bgColor='gray.200' borderRadius='md' mb='10px'>
                    <Text textAlign='center'>
                      {tag}
                    </Text>
                  </Box>
                ))
              }
            </SimpleGrid>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
}

import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { api } from "../../services/api";
import { AiOutlineSearch } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { useRouter } from "next/router";

export function Header() {

  const router = useRouter()
  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const categoriesArray = [
    "nature",
    "wallpaper",
    "landscape",
    "architecture",
    "fashion",
    "foods & drinks",
    "experimental",
    "film",
    "people",
    "travel",
    "animals",
    "arts & culture",
    "history",
    "athletics",
  ]

  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    slides: {
      perView: 12,
    },
    breakpoints: {
      '(max-width: 1310px)': {
        slides: {
          perView: 8,
        },
      },
      '(max-width: 870px)': {
        slides: {
          perView: 6,
        },
      },
      '(max-width: 652px)': {
        slides: {
          perView: 4,
        },
      },
      '(max-width: 520px)': {
        slides: {
          perView: 3,
        },
      },
      '(max-width: 480px)': {
        slides: {
          perView: 2,
        },
      },
    }
  })

  const wide = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <>
      {
        !wide ? (
          <Flex w="100%" h="80px" align={"center"}>
            <Link href='/' passHref>
              <Avatar src='/logo.png' mx='10px' size='md' as='a' />
            </Link>
            <Spacer />
            <Button
              boxSize={"80px"}
              borderRadius={"0"}
              bgColor="#FFF"
              colorScheme={"#FFF"}
              onClick={onOpen}
            >
              <FiMenu size={30} color="black" />
            </Button>

            <Drawer
              isOpen={isOpen}
              placement='right'
              onClose={onClose}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader onClick={() => { onClose(), router.push('/') }}>Pelourinho Studio</DrawerHeader>
                <DrawerBody>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineSearch />}
                    />
                    <Input
                      placeholder='Search something...'
                      bgColor="#E8E8E8"
                      borderRadius='60px'
                    />
                  </InputGroup>
                  {
                    isAuthenticated ? (
                      <>
                        <Stack align={"flex-end"} w="100%" display={"flex"} mt="20px" pr="5px">
                          <Link href='/myAccount/accountDetails' passHref>
                            <Text as='a' onClick={onClose}>Minha Conta</Text>
                          </Link>
                          <Link href='/myAccount/uploadImage' passHref>
                            <Text as='a' onClick={onClose}>Adicionar Imagem</Text>
                          </Link>
                          <Link href='/myAccount/myGallery' passHref>
                            <Text as='a' onClick={onClose}>Minha Galeria</Text>
                          </Link>
                        </Stack>
                      </>
                    ) : (
                      <></>
                    )
                  }
                </DrawerBody>
                <DrawerFooter>
                  {
                    isAuthenticated ? (
                      <>
                        <Flex align={"center"} w="100%">
                          <Flex align={"center"}>
                            <Avatar m='6px' name={user.avatar} src={user.avatar} />
                            <Text>{user.firstName + " " + user.lastName}</Text>
                          </Flex>
                          <Spacer />
                          <IconButton
                            aria-label='Log Out'
                            bgColor="#FFF"
                            colorScheme={"#FFF"}
                            icon={<BiLogOut
                              size={25}
                              color="black" />}
                            onClick={signOut}
                          />
                        </Flex>
                      </>
                    ) : (
                      <>
                        <Flex w="100%" justify={"flex-end"}>
                          <Link href='/login' passHref>
                            <Text cursor='pointer' px="20px">
                              Login
                            </Text>
                          </Link>
                          <Link href='/register' passHref>
                            <Text cursor='pointer'>Register</Text>
                          </Link>
                        </Flex>
                      </>
                    )
                  }
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Flex>
        ) : (
          <Box
            w='100%'
            h='124px'
            align='center'
            justify='space-between'
            boxShadow='
            rgba(0, 0, 0, 0.12) 0px 1px 3px,
            rgba(0, 0, 0, 0.24) 0px 1px 2px'
            pt="20px"
            display={"flex"}
            flexDirection={"column"}
          >
            <Flex>
              <Flex align='center'>
                <Link href='/' passHref>
                  <Avatar src='/logo.png' mx='10px' size='lg' as='a' />
                </Link>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AiOutlineSearch />}
                  />
                  <Input
                    placeholder='Search something...'
                    bgColor="#E8E8E8"
                    borderRadius='60px'
                    w="500px"
                  />
                </InputGroup>
              </Flex>
              <Spacer />
              {
                isAuthenticated ? (
                  <Menu>
                    <MenuButton borderRadius='lg' mr='10px'>
                      <Flex align='center'>
                        <Text>{user.firstName + " " + user.lastName}</Text>
                        <Avatar m='6px' name={user.avatar} src={user.avatar} />
                        <FiChevronDown />
                      </Flex>
                    </MenuButton>
                    <Portal>
                      <MenuList zIndex={1000}>
                        <Link href='/myAccount/accountDetails' passHref>
                          <MenuItem as='a'>Minha Conta</MenuItem>
                        </Link>
                        <Link href='/myAccount/uploadImage' passHref>
                          <MenuItem as='a'>Adicionar Imagem</MenuItem>
                        </Link>
                        <Link href='/myAccount/myGallery' passHref>
                          <MenuItem as='a'>Minha Galeria</MenuItem>
                        </Link>
                          <Link href='/myAccount/favorites' passHref>
                            <MenuItem as='a'>Favoritos</MenuItem>
                          </Link>
                        <MenuItem as='button' onClick={signOut}>
                          Sair
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                ) : (
                  <Flex h="100%" align={"center"}>
                    <Link href='/login' passHref>
                      <Text mx='10px' cursor='pointer'>
                        Login
                      </Text>
                    </Link>
                    <Link href='/register' passHref>
                      <Text cursor='pointer' mx="10px">
                        Register
                      </Text>
                    </Link>
                  </Flex>
                )
              }
            </Flex>
            <Flex mt="8px">
              <div ref={ref} className="keen-slider">
                {
                  categoriesArray.map((category: any) => (
                    <Link href={`/category/${category}`}>
                      <div className="keen-slider__slide number-slide1" style={{ textTransform: "capitalize", cursor: "pointer" }}>{category}</div>
                    </Link>
                  ))
                }
              </div>
            </Flex>
          </Box>
        )
      }
    </>
  );
}

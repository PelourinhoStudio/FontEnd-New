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
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { AiOutlineSearch } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export function Header() {
  const {
    handleSubmit,
    register,
  } = useForm();
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
  ];

  const [ref] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    slides: {
      perView: 12,
    },
    breakpoints: {
      "(max-width: 1310px)": {
        slides: {
          perView: 8,
        },
      },
      "(max-width: 870px)": {
        slides: {
          perView: 6,
        },
      },
      "(max-width: 652px)": {
        slides: {
          perView: 4,
        },
      },
      "(max-width: 520px)": {
        slides: {
          perView: 3,
        },
      },
      "(max-width: 480px)": {
        slides: {
          perView: 2,
        },
      },
    },
  });

  const [refWide] = useKeenSlider<HTMLDivElement>({
    mode: "free",
    loop: true,
    slides: {
      perView: 2,
      origin: 'center'
    },
  });

  const wide = useBreakpointValue({
    base: false,
    lg: true,
  });

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
      {!wide ? (
        <Flex w='100%' h='80px' align={"center"}>
          <Link href='/' passHref>
            <Avatar src='/logo.png' mx='10px' size='md' as='a' />
          </Link>
          <Spacer />
          <Button
            boxSize={"80px"}
            borderRadius={"0"}
            bgColor='#FFF'
            colorScheme={"#FFF"}
            onClick={onOpen}>
            <FiMenu size={30} color='black' />
          </Button>

          <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader
                onClick={() => {
                  onClose(), router.push("/");
                }}>
                Pelourinho Studio
              </DrawerHeader>
              <DrawerBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineSearch />}
                    />
                    <Input
                      {...register("tags")}
                      placeholder="Pesquisar por tags, divididas por ','"
                      bgColor='#E8E8E8'
                      borderRadius='60px'
                    />
                  </InputGroup>
                </form>
                {isAuthenticated ? (
                  <>
                    <Stack
                      align={"flex-end"}
                      w='100%'
                      display={"flex"}
                      mt='20px'
                      pr='5px'>
                      <Link href='/myAccount/accountDetails' passHref>
                        <Text as='a' onClick={onClose}>
                          Minha Conta
                        </Text>
                      </Link>
                      {
                        String(user.userType).toUpperCase() === 'DEFAULT' ? (
                          <></>
                        ) : (
                          <Link href='/myAccount/uploadImage' passHref>
                            <Text as='a' onClick={onClose}>
                              Adicionar Imagem
                            </Text>
                          </Link>
                        )
                      }
                      <Link href='/myAccount/myGallery' passHref>
                        <Text as='a' onClick={onClose}>
                          Minha Galeria
                        </Text>
                      </Link>
                      <Link href='/myAccount/favorites' passHref>
                        <Text as='a' onClick={onClose}>
                          Favoritos
                        </Text>
                      </Link>
                      <Link href='/myAccount/myGallery' passHref>
                        <Text as='a' onClick={signOut}>
                          Sair
                        </Text>
                      </Link>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Flex w='100%' my="20px" justify="center">
                      <Link href='/login' passHref>
                        <Text cursor='pointer' px='20px' as="a" onClick={onClose}>
                          Login
                        </Text>
                      </Link>
                      <Link href='/register' passHref>
                        <Text cursor='pointer' as="a" onClick={onClose}>Register</Text>
                      </Link>
                    </Flex>
                  </>
                )}
              </DrawerBody>
              <DrawerFooter>
                <Flex mt='8px' w="100%" onClick={onClose}>
                  <div ref={refWide} className='keen-slider'>
                    {categoriesArray.map((category: any) => (
                      <Link href={`/category/${category}`}>
                        <div
                          className='keen-slider__slide number-slide1'
                          style={{ textTransform: "capitalize", cursor: "pointer" }}>
                          {category}
                        </div>
                      </Link>
                    ))}
                  </div>
                </Flex>
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
          pt='20px'
          display={"flex"}
          flexDirection={"column"}>
          <Flex>
            <Flex align='center'>
              <Link href='/' passHref>
                <Avatar src='/logo.png' mx='10px' size='lg' as='a' />
              </Link>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AiOutlineSearch />}
                  />
                  <Input
                    {...register("tags")}
                    placeholder="Pesquisar por tags, divididas por ','"
                    bgColor='#E8E8E8'
                    borderRadius='60px'
                    w='500px'
                  />
                </InputGroup>
              </form>
            </Flex>
            <Spacer />
            {isAuthenticated ? (
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
                      <MenuItem as='a'><Box as="button">Minha Conta</Box></MenuItem>
                    </Link>
                    {
                      String(user.userType).toUpperCase() === 'DEFAULT' ? (
                        <></>
                      ) : (
                        <Link href='/myAccount/uploadImage' passHref>
                          <MenuItem as='a'>Adicionar Imagem</MenuItem>
                        </Link>
                      )
                    }
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
              <Flex h='100%' align={"center"}>
                <Link href='/login' passHref>
                  <Text mx='10px' cursor='pointer'>
                    Login
                  </Text>
                </Link>
                <Link href='/register' passHref>
                  <Text cursor='pointer' mx='10px'>
                    Register
                  </Text>
                </Link>
              </Flex>
            )}
          </Flex>
          <Flex mt='8px'>
            <div ref={ref} className='keen-slider'>
              {categoriesArray.map((category: any) => (
                <Link href={`/category/${category}`}>
                  <div
                    className='keen-slider__slide number-slide1'
                    style={{ textTransform: "capitalize", cursor: "pointer" }}>
                    {category}
                  </div>
                </Link>
              ))}
            </div>
          </Flex>
        </Box>
      )}
    </>
  );
}

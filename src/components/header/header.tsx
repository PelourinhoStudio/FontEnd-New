import {
  Avatar,
  Box,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FiChevronDown } from "react-icons/fi";
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { api } from "../../services/api";

export function Header() {

  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const [categories, setCategories] = useState([])

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 15,
    },
  })

  useEffect(() => {
    api.get('/categories')
      .then(res => {
        setCategories(res.data)
      })
  }, [])

  return (
    <>
      {isAuthenticated ? (
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
              <Input
                placeholder='Search...'
                w='100%'
                maxW='500px'
                h='50px'
                borderRadius='60px'
                bgColor='#E8E8E8'
              />
            </Flex>
            <Spacer />
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
                  <MenuItem as='button' onClick={signOut}>
                    Sair
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Flex>
          <Flex>
            <div ref={ref} className="keen-slider">
              {
                categories.map((categorie: any) => (
                  <div className="keen-slider__slide number-slide1">{categorie}</div>
                ))
              }
            </div>
          </Flex>
        </Box>
      ) : (
        <>
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
            <Flex
            >
              <Flex align='center'>
                <Link href='/' passHref>
                  <Avatar src='/logo.png' mx='10px' size='lg' as='a' />
                </Link>
                <Input
                  placeholder='Search...'
                  w='100%'
                  maxW='500px'
                  h='50px'
                  borderRadius='60px'
                  bgColor='#E8E8E8'
                />
              </Flex>
              <Spacer />
              <Flex h="100%" align={"center"}>
                <Link href='/login' passHref>
                  <Text mx='10px' cursor='pointer'>
                    Login
                  </Text>
                </Link>
                <Link href='/register' passHref>
                  <Text cursor='pointer' mx="10px">Register</Text>
                </Link>
              </Flex>
            </Flex>
            <Flex>
              <div ref={ref} className="keen-slider">
                {
                  categories.map((categorie: any) => (
                    <div className="keen-slider__slide number-slide1">{categorie}</div>
                  ))
                }
              </div>
            </Flex>
          </Box>
        </>
      )
      }
    </>
  );
}

import {
  Avatar,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { FiChevronDown } from "react-icons/fi";

export function Header() {
  const { user, isAuthenticated, signOut } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <Flex
          w='100%'
          h='124px'
          align='center'
          justify='space-between'
          boxShadow='
                        rgba(0, 0, 0, 0.12) 0px 1px 3px,
                        rgba(0, 0, 0, 0.24) 0px 1px 2px'>
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
          <Menu>
            <MenuButton borderRadius='lg' mr='10px'>
              <Flex align='center'>
                <Text>{user.firstName + " " + user.lastName}</Text>
                <Avatar m='6px' name={user.firstName} />
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
      ) : (
        <Flex
          w='100%'
          h='124px'
          align='center'
          justify='space-between'
          boxShadow='
                        rgba(0, 0, 0, 0.12) 0px 1px 3px,
                        rgba(0, 0, 0, 0.24) 0px 1px 2px'>
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
          <Flex mx='10px'>
            <Link href='/login' passHref>
              <Text mx='10px' cursor='pointer'>
                Login
              </Text>
            </Link>
            <Link href='/register' passHref>
              <Text cursor='pointer'>Register</Text>
            </Link>
          </Flex>
        </Flex>
      )}
    </>
  );
}

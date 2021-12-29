import { Avatar, Flex, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function AccountInfoComp() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <VStack>
        <Avatar
          // src={user.avatar}
          size='xl'
        />
        <Flex
          w='100%'
          maxW='230px'
          h='50px'
          align='center'
          justify='center'
          borderRadius='12px'
          bgColor='#E8E8E8'>
          {/* {user.firstName + " " + user.lastName} */}
        </Flex>
        <Flex
          w='100%'
          maxW='230px'
          h='50px'
          bgColor='#E8E8E8'
          align='center'
          justify='center'
          borderRadius='12px'>
          {/* {user.userType} */}
        </Flex>
      </VStack>
    </>
  );
}

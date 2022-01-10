import { Avatar, Box, Button, Center, Divider, Flex, FormControl, FormLabel, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


export function AccountDetails() {

    const { user } = useContext(AuthContext)

    return (
        <>
            <Text fontWeight="bold" fontSize="40px" h="15%" textAlign={"center"}>Account Settings</Text>
            <Box>
                <form>
                    <VStack>
                        <Avatar
                            src={"https://github.com/diogosousa17.png"}
                            size={"2xl"}
                        />
                        <Center>
                        <FormControl>
                            <FormLabel>Alterar Avatar</FormLabel>
                            <Input 
                            type="file"
                                />
                        </FormControl>
                        </Center>
                        <HStack>
                            <FormControl>
                                <FormLabel>Primeiro Nome</FormLabel>
                                <Input
                                    boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Último Nome</FormLabel>
                                <Input
                                    boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                />
                            </FormControl>
                        </HStack>
                        <HStack>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Qualquer Coisa</FormLabel>
                                <Input
                                    boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                />
                            </FormControl>
                        </HStack>
                        <Button bgColor='#14387B' color="#FFF" type={"submit"}>Alterar Dados</Button>
                    </VStack>
                </form>
            </Box>
        </>
    )
}
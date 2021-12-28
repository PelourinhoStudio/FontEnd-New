import { Button, Center, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useForm } from 'react-hook-form'
import { api } from "../../services/api";

export function RegisterPage() {

    const toast = useToast()
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data: any) => {
        const newUser = {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password
        }
        await api.post('/auth/register', newUser)
            .then(res => {
                toast({
                    position: 'top-start',
                    isClosable: true,
                    title: 'Conta criada com sucesso!',
                    status: 'success',
                })
            })
            .catch(err => {
                toast({
                    position: 'top-start',
                    isClosable: true,
                    title: 'Erro ao criar conta. Tente novamente mais tarde.',
                    status: 'error',
                })
            })
    }

    return (
        <>
            <Flex
                justify="center"
                align="center"
                h="calc(100vh - 124px)"
                mx="10px"
            >
                <Flex
                    w="100%"
                    maxW="500px"
                    h="500px"
                    boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                    justify="center"
                    borderRadius="20px"
                    align="center"
                    flexDirection="column"
                >
                    <Text fontSize="40px" fontWeight="bold">Register</Text>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Center>
                            <Flex flexDirection="column" align="center">
                                <Input
                                    w="90%"
                                    maxW="400px"
                                    h="50px"
                                    borderRadius="60px"
                                    bgColor="#E8E8E8"
                                    placeholder="First Name"
                                    type="text"
                                    {...register("firstName")}
                                />
                                <Input
                                    w="90%"
                                    maxW="400px"
                                    h="50px"
                                    borderRadius="60px"
                                    bgColor="#E8E8E8"
                                    placeholder="Last Name"
                                    type="text"
                                    m="10px"
                                    {...register("lastName")}
                                />
                                <Input
                                    w="90%"
                                    maxW="400px"
                                    h="50px"
                                    borderRadius="60px"
                                    bgColor="#E8E8E8"
                                    placeholder="Email"
                                    type="email"
                                    {...register("email")}
                                />
                                <Input
                                    w="90%"
                                    maxW="400px"
                                    h="50px"
                                    borderRadius="60px"
                                    bgColor="#E8E8E8"
                                    m="10px"
                                    placeholder="Password"
                                    type="password"
                                    {...register("password")}
                                />
                                <Button
                                    w="100%"
                                    maxW="200px"
                                    h="50px"
                                    bgColor="#14387B"
                                    color="#fff"
                                    borderRadius="60px"
                                    type="submit"
                                >
                                    Entrar
                                </Button>
                            </Flex>
                        </Center>
                    </form>
                </Flex>
            </Flex>
        </>
    )
}
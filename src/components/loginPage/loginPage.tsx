import {
    Button,
    Center,
    Flex,
    Input,
    Text
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";
import { useForm } from 'react-hook-form'
import { AuthContext } from "../../contexts/AuthContext";


export function LoginPage() {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const { signIn } = useContext(AuthContext)
    const { "studio.token": token }: any = parseCookies()
    const router = useRouter()

    useEffect(() => {
        if (token) {
            router.push('/')
        }
    }, [])

    async function handleSignIn(data: any) {
        await signIn(data)
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
                    <Text fontSize="40px" fontWeight="bold">Login</Text>
                    <form onSubmit={handleSubmit(handleSignIn)}>
                        <Center>
                            <Flex flexDirection="column" align="center">
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
                                    isLoading={isSubmitting}
                                >
                                    Entrar
                                </Button>
                            </Flex>
                        </Center>
                    </form>
                    <Text m="10px" color="grey">Recuperar Password</Text>
                </Flex>
            </Flex>
        </>
    )
}
import {
    Avatar,
    Button,
    Center,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Text,
    useToast,
    VStack
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { ref, storage, uploadBytesResumable, getDownloadURL } from "../../services/firebase";


export function AccountDetails() {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const { 'studio.token': token } = parseCookies()
    const toast = useToast()

    const onSubmit = async (data: any) => {
        const storageRef = ref(storage, "avatar/" + data.avatar[0].name)
        await uploadBytesResumable(storageRef, data.avatar[0])
        await getDownloadURL(storageRef).then(async (res) => {
            const alterUser = {
                avatar: res,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email
            }
            await api.put(`/me/edit`, alterUser, {
                headers: {
                    'x-access-token': token
                }
            })
                .then(res => {
                    toast({
                        position: 'top-start',
                        isClosable: true,
                        title: 'Dados alterado com sucesso!',
                        status: 'success',
                    })
                }).catch(err => {
                    toast({
                        position: 'top-start',
                        isClosable: true,
                        title: 'Erro ao alterar dados. Tente novamente mais tarde',
                        status: 'error',
                    })
                })
        })

    }

    return (
        <>
            <Text fontWeight="bold" fontSize="40px" h="15%" textAlign={"center"}>Account Settings</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack h="calc(80vh - 124px)" justify="center">
                    <Avatar
                        src={"https://github.com/diogosousa17.png"}
                        size={"2xl"}
                    />
                    <HStack>
                        <FormControl>
                            <FormLabel>Primeiro Nome</FormLabel>
                            <Input
                                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                {...register("firstName")}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Último Nome</FormLabel>
                            <Input
                                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                {...register("lastName")}
                            />
                        </FormControl>
                    </HStack>
                    <HStack>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                {...register("email")}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Alterar Avatar</FormLabel>
                            <Input
                                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                type="file"
                                {...register("avatar")}
                            />
                        </FormControl>
                    </HStack>
                    <Button bgColor='#14387B' color="#FFF" type={"submit"} isLoading={isSubmitting}>Alterar Dados</Button>
                </VStack>
            </form>
        </>
    )
}

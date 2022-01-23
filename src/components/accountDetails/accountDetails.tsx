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
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../services/api";
import { ref, storage, uploadBytesResumable, getDownloadURL } from "../../services/firebase";

export function AccountDetails() {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const { 'studio.token': token } = parseCookies()
    const toast = useToast()
    const { user } = useContext(AuthContext)

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
                        title: 'Dados alterados com sucesso!',
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
            <Text fontWeight="bold" fontSize="40px" h="15%" textAlign={"center"}>Definições de Conta</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack h="calc(80vh - 124px)" justify="center">
                    <Avatar
                        src={user?.avatar}
                        size={"2xl"}
                    />
                    <FormControl w="500px">
                        <FormLabel>Alterar Avatar</FormLabel>
                        <Input
                            boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                            {...register("avatar")}
                            type="file"
                        />
                    </FormControl>
                    <HStack w="500px">
                        <FormControl>
                            <FormLabel>Primeiro Nome</FormLabel>
                            <Input
                                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                {...register("firstName")}
                                defaultValue={user?.firstName}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Último Nome</FormLabel>
                            <Input
                                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                {...register("lastName")}
                                defaultValue={user?.lastName}
                            />
                        </FormControl>
                    </HStack>
                    <HStack w="500px">
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input
                                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                                {...register("email")}
                                defaultValue={user?.email}
                            />
                        </FormControl>
                    </HStack>
                    <Button bgColor='#14387B' color="#FFF" type={"submit"} isLoading={isSubmitting}>Alterar Dados</Button>
                </VStack>
            </form>
        </>
    )
}
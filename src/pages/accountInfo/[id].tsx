import {
  Avatar,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack
} from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";

const AccountInfo: NextPage = ({ data }: any) => {

  const { register, handleSubmit, formState: { isSubmitting } } = useForm()
  const { _id, avatar, firstName, lastName, email } = data

  const onSubmit = async (data: any) => {
    const storageRef = ref(storage, "avatar/" + data.images[0].name)
    await uploadBytesResumable(storageRef, data.images[0])
    await getDownloadURL(storageRef).then(async (res) => {
      const alterUser = {
        avatar: res,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
      }
      await api.put(`/me/users/${_id}`, alterUser)
        .then(res => {

        }).catch(err => {

        })
    })

  }

  return (
    <>
      <Text fontWeight="bold" fontSize="40px" h="15%" textAlign={"center"}>Account Settings</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack h="calc(80vh - 124px)" justify="center">
          <Avatar
            src={avatar}
            size={"2xl"}
          />
          <HStack>
            <FormControl>
              <FormLabel>Primeiro Nome</FormLabel>
              <Input
                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                {...register("firstName")}
                defaultValue={firstName}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Último Nome</FormLabel>
              <Input
                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                {...register("lastName")}
                defaultValue={lastName}
              />
            </FormControl>
          </HStack>
          <HStack>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                {...register("email")}
                defaultValue={email}
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
          <Button bgColor='#14387B' color="#FFF" type={"submit"}>Alterar Dados</Button>
        </VStack>
      </form>
    </>

  )
}

export default AccountInfo
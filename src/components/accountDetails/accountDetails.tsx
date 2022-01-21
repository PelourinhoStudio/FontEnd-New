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
import { useForm } from "react-hook-form";

export function AccountDetails() {

    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        const alterUser = {
            avatar: data.avatar,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        }
        console.log(alterUser)
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
                    <Center>
                        <FormControl>
                            <FormLabel>Alterar Avatar</FormLabel>
                            <Input
                                type="file"
                                {...register("avatar")}
                            />
                        </FormControl>
                    </Center>
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
                        {/* <FormControl>
                            <FormLabel>Qualquer Coisa</FormLabel>
                            <Input
                                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                            />
                        </FormControl> */}
                    </HStack>
                    <Button bgColor='#14387B' color="#FFF" type={"submit"}>Alterar Dados</Button>
                </VStack>
            </form>
        </>
    )
}
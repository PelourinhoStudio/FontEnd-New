import { 
    Button, 
    Center, 
    Flex, 
    FormLabel, 
    HStack, 
    Input, 
    Select, 
    Text, 
    Textarea, 
    useToast, 
    VStack 
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { ref, storage, uploadBytesResumable, getDownloadURL } from '../../services/firebase'

export function UploadImageForm() {

    const toast = useToast()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const { 'studio.token': token } = parseCookies()

    let config = {
        headers: {
            'x-access-token': token
        }
    }

    const onSubmit = async (data: any) => {
        const storageRef = ref(storage, 'images/' + data.images[0].name);
        await uploadBytesResumable(storageRef, data.images[0]);
        await getDownloadURL(storageRef)
            .then(async (res) => {
                const newImage = {
                    title: data.title,
                    description: data.description,
                    category: [data.category],
                    tags: data.tags,
                    price: data.price,
                    year: data.year,
                    imageType: data.imageType,
                    imageCDN: res,
                }
                await api.post('/admin/images', newImage, config)
                    .then(res => {
                        toast({
                            position: 'top-start',
                            isClosable: true,
                            title: 'Upload realizado com sucesso!',
                            status: 'success',
                        })
                    })
                    .catch(err => {
                        toast({
                            position: 'top-start',
                            isClosable: true,
                            title: 'Erro ao realizar upload Tente novamente mais tarde.',
                            status: 'error',
                        })
                    })
            })
    }

    return (
        <>
            <Flex justify="center" align="flex-start" h="20%">
                <Center>
                    <Text fontWeight="bold" fontSize="40px">Upload</Text>
                </Center>
            </Flex>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack align="center" spacing="30px" h="100%">
                    <HStack>
                        <Input
                            bgColor="#FFF"
                            borderRadius="30px"
                            w="288px" h="46px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            placeholder="Title"
                            type="text"
                            {...register("title")}
                        />
                        <Input
                            bgColor="#FFF"
                            borderRadius="30px"
                            w="288px"
                            h="46px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            placeholder="Year"
                            type="date"
                            {...register("year")}
                        />
                    </HStack>
                    <Textarea
                        bgColor="#FFF"
                        borderRadius="10px 10px 0 10px"
                        w="586px"
                        h="300px"
                        maxH="300px"
                        boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                        placeholder="Description"
                        {...register("description")}
                    />
                    <HStack>
                        <Select
                            bgColor="#FFF"
                            borderRadius="30px"
                            w="288px"
                            h="46px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            placeholder="Category"
                            {...register("category")}
                        >
                            <option value='Landscape'>Landscape</option>
                            <option value='Wallpapper'>Wallpapper</option>
                            <option value='Nature'>Nature</option>
                            <option value='Drawing'>Drawing</option>
                        </Select>
                        <Select
                            bgColor="#FFF"
                            borderRadius="30px"
                            w="288px"
                            h="46px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            placeholder="Type"
                            {...register("imageType")}
                        >
                            <option value='real'>Real</option>
                            <option value='digital'>Digital</option>
                        </Select>
                    </HStack>
                    <HStack>
                        <Input
                            bgColor="#FFF"
                            borderRadius="30px"
                            w="288px"
                            h="46px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            placeholder="Tags"
                            {...register("tags")}
                        />
                        <Input
                            bgColor="#FFF"
                            borderRadius="30px"
                            w="288px"
                            h="46px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            placeholder="Price"
                            type="number"
                            {...register("price")}
                        />
                    </HStack>
                    <Flex
                        h="100%"
                    >
                        <FormLabel
                            h="100%"
                            textAlign="center"
                            htmlFor='selectImage'
                            cursor='pointer'
                            bgColor="#FFF"
                            borderRadius="60px"
                            w="100%"
                            maxW="158px"
                            maxH="56px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            display="flex"
                            justify="center"
                            align="center"
                        >
                            Escolher Imagem
                        </FormLabel>
                        <Input
                            id='selectImage'
                            bgColor="#FFF"
                            display="none"
                            borderRadius="30px"
                            w="288px"
                            h="46px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            placeholder="Tags"
                            type="file"
                            {...register("images")}
                        />
                        <Button
                            type="submit"
                            bgColor="#14387B"
                            color="#FFF"
                            borderRadius="60px"
                            w="218px"
                            h="56px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            isLoading={isSubmitting}
                        >
                            Upload
                        </Button>
                    </Flex>
                </VStack>
            </form>
        </>
    )
}
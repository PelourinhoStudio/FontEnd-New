import {
    Button,
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
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export function UploadImageForm() {

    const toast = useToast()
    const { register, handleSubmit, formState: { isSubmitting } } = useForm()
    const { 'studio.token': token } = parseCookies()
    const { user } = useContext(AuthContext)

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
                    author: user._id
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
            <Text fontWeight="bold" fontSize="40px" h="15%">Upload</Text>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={10}>
                    <HStack w="100%" spacing={10}>
                        <Input
                            bgColor="#FFF"
                            placeholder="Title"
                            borderRadius="60px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            {...register("title")}
                        />
                        <Input
                            bgColor="#FFF"
                            type="date"
                            borderRadius="60px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            {...register("year")}
                        />
                    </HStack>
                    <Textarea
                        bgColor="#FFF"
                        h="50px"
                        maxH="200px"
                        placeholder="Description"
                        borderRadius="10px 10px 0 10px"
                        boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                        {...register("description")}
                    />
                    <HStack w="100%" spacing={10}>
                        <Select
                            bgColor="#FFF"
                            borderRadius="60px"
                            placeholder="Category"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            {...register("category")}
                        >
                            <option value='Landscape'>Landscape</option>
                            <option value='Wallpapper'>Wallpapper</option>
                            <option value='Nature'>Nature</option>
                            <option value='Drawing'>Drawing</option>
                        </Select>
                        <Select
                            bgColor="#FFF"
                            borderRadius="60px"
                            placeholder="Image Type"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            {...register("imageType")}
                        >
                            <option value='real'>Real</option>
                            <option value='digital'>Digital</option>
                        </Select>
                    </HStack>
                    <HStack spacing={10}>
                        <Input
                            bgColor="#FFF"
                            placeholder="Tags"
                            borderRadius="60px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            {...register("tags")}
                        />
                        <Input
                            bgColor="#FFF"
                            placeholder="Price"
                            type="number"
                            borderRadius="60px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            {...register("price")}
                        />
                    </HStack>
                    <HStack justify="center" w="100%" spacing={10}>
                        <Input
                            type="file"
                            border="none"
                            {...register("images")}
                        />
                        <Button
                            w="100%"
                            color="#FFF"
                            type="submit"
                            bgColor="#14387B"
                            borderRadius="60px"
                            boxShadow="rgba(0, 0, 0, 0.16) 0px 1px 4px"
                            isLoading={isSubmitting}
                        >
                            Upload
                        </Button>
                    </HStack>
                </VStack>
            </form>
        </>
    )
}
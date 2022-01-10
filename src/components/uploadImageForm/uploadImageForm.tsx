import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { parseCookies } from "nookies";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import {
  ref,
  storage,
  uploadBytesResumable,
  getDownloadURL,
} from "../../services/firebase";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { AxiosError } from "axios";

export function UploadImageForm() {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { "studio.token": token } = parseCookies();
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  let config = {
    headers: {
      "x-access-token": token,
    },
  };

  const onSubmit = async (data: any) => {
    data.tags = data.tags.split(",").map((tag: string) => tag.trim());

    let imageFiles: any = [data.images][0];

    let uploadPromises: any[] = [];

    uploadPromises.push(
      [...imageFiles].map(async (file: any) => {
        const storageRef = ref(storage, "images/" + file.name);
        await uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        return downloadURL;
      })
    );

    await Promise.all(uploadPromises[0]).then(
      (values: any) => (data.imageCDN = values)
    );

    let imageLinks = data.imageCDN;
    data.imageCDN = "";
    delete data.images;

    imageLinks.map(async (imageLink: any) => {
      data.imageCDN = imageLink;
      data.author = user._id;
      data.category = categories;

      await api
        .post("/admin/images", data, config)
        .then((res) => {
          toast({
            position: "top-start",
            isClosable: true,
            title: "Upload realizado com sucesso!",
            status: "success",
          });
        })
        .catch((err: AxiosError) => {
          console.log(err.message);
          toast({
            position: "top-start",
            isClosable: true,
            title: "Erro ao realizar upload Tente novamente mais tarde.",
            status: "error",
          });
        });
    });
  };

  return (
    <>
      <Flex direction='column' alignItems='center'>
        <Text fontWeight='bold' fontSize='40px' h='15%' my='8'>
          Upload
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={8}>
            <HStack w='100%' spacing={10}>
              <Input
                bgColor='#FFF'
                placeholder='Title'
                borderRadius='8'
                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                isRequired
                {...register("title")}
              />
              <Input
                bgColor='#FFF'
                type='date'
                borderRadius='8'
                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                isRequired
                {...register("year")}
              />
            </HStack>
            <Textarea
              bgColor='#FFF'
              h='50px'
              maxH='200px'
              placeholder='Description'
              borderRadius='10px 10px 0 10px'
              boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
              isRequired
              {...register("description")}
            />
            <HStack w='100%' spacing={10}>
              <Menu closeOnSelect={false}>
                <MenuButton
                  as={Button}
                  w='150px'
                  bgColor='white'
                  boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                  isRequired>
                  Category
                </MenuButton>
                <MenuList>
                  <MenuOptionGroup
                    type='checkbox'
                    onChange={(e: any) => {
                      setCategories(e);
                    }}>
                    <MenuItemOption value='landscape'>Landscape</MenuItemOption>
                    <MenuItemOption value='wallpaper'>Wallpaper</MenuItemOption>
                    <MenuItemOption value='nature'>Nature</MenuItemOption>
                    <MenuItemOption value='drawing'>Drawing</MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
              <Select
                bgColor='#FFF'
                borderRadius='8'
                placeholder='Image Type'
                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                {...register("imageType")}
                isRequired>
                <option value='real'>Real</option>
                <option value='digital'>Digital</option>
              </Select>
            </HStack>
            <HStack spacing={10}>
              <Input
                bgColor='#FFF'
                placeholder='Tags (dividas por vírgula)'
                borderRadius='8'
                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                {...register("tags")}
                isRequired
              />
              <Input
                bgColor='#FFF'
                placeholder='Price'
                type='number'
                borderRadius='8'
                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                {...register("price")}
                isRequired
              />
            </HStack>
            <HStack justify='center' w='100%' spacing={10}>
              <Input
                multiple
                type='file'
                id='images'
                border='none'
                {...register("images")}
                isRequired
              />

              <Button
                w='100%'
                color='#FFF'
                type='submit'
                bgColor='#14387B'
                borderRadius='8'
                boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
                isLoading={isSubmitting}>
                Upload
              </Button>
            </HStack>
          </VStack>
        </form>
      </Flex>
    </>
  );
}

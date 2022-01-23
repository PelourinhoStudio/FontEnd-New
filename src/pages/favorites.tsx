import { Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { GalleryComp } from "../components/GalleryComp";
import { api } from "../services/api";


const Favorites: NextPage = () => {

  const [images, setImages] = useState([])
  const { "studio.token": token }: any = parseCookies()
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (token) {
      api.get("/me/images/favorites/", { headers: { "x-access-token": token } })
        .then(
          res => {
            setImages(res.data.flat()[0]?.favorites)
            setLoaded(true)
          }
        )
    } else {
      router.push('/')
    }
  }, [])

  return (
    <>
      {
        !loaded ? (
          <Flex
            w="100%"
            h="calc(100vh - 124px)"
            align="center"
            justify="center"
          >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Flex>
        ) : (
          <>
            <Center>
              <Heading textTransform={"capitalize"}>Favoritos</Heading>
            </Center>
            <GalleryComp imageList={images} />
          </>
        )
      }
    </>
  )
}

export default Favorites
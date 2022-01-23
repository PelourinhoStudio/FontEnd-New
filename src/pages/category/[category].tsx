import { Center, Flex, Heading, Spinner } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { GalleryComp } from "../../components/GalleryComp";
import { api } from "../../services/api";


const Category: NextPage = ({ params }: any) => {

  const [images, setImages] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    api.get(`/category/${params.category}`)
      .then(res => {
        setImages(res.data)
        setLoaded(true)
      })
  }, [params])

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
              <Heading textTransform={"capitalize"}>{params.category}</Heading>
            </Center>
            <GalleryComp imageList={images} />
          </>
        )
      }
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

  return {
    props: {
      params
    },
  }
}

export default Category
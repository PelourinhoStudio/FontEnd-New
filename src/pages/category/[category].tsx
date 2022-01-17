import { Center, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { GalleryComp } from "../../components/GalleryComp";
import { api } from "../../services/api";


const Category: NextPage = ({ params }: any) => {

  const [images, setImages] = useState([])

  useEffect(() => {
    api.get(`/category/${params.category}`)
      .then(res => {
        setImages(res.data)
      })
  }, [params])

  return (
    <>
      <Center>
        <Heading textTransform={"capitalize"}>{params.category}</Heading>
      </Center>
      <GalleryComp imageList={images} />
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
import { Center, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { GalleryComp } from "../components/GalleryComp";
import { api } from "../services/api";


const Favorites: NextPage = () => {

  const [images, setImages] = useState([])
  const {"studio.token" : token} : any = parseCookies()

  useEffect(()=>{
    api.get("/me/images/favorites/", {headers:{"x-access-token" : token}})
    .then (
      res => {
        console.log(res.data.flat()[0])
        setImages(res.data.flat()[0].favorites)
      }
    )
  },[])

  return (
    <>
    <Center>
        <Heading textTransform={"capitalize"}>Favoritos</Heading>
     </Center>
    <GalleryComp imageList={images} />
    </>
  )
}

export default Favorites
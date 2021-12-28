import { Box, Image } from "@chakra-ui/react"
import { parseCookies } from "nookies"
import { useEffect, useState } from "react"
import { api } from "../../services/api"

type Image = {
    imageCDN: string
    _id: string
}

export function MyGalleryComp() {

    const [images, setImages] = useState([])
    const { 'studio.token': token } = parseCookies()

    let config = {
        headers: {
            'x-access-token': token
        }
    }

    useEffect(() => {
        api
            .get("/images", config)
            .then((response) => setImages(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro " + err)
            })
    }, [])

    return (
        <>
            <Box
                padding={4}
                w="100%"
                mx="auto"
                sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}
                overflowY="scroll"
                h="49rem"
            >
                {
                    images.map((image: Image) => {
                        return (
                            <Image
                                key="image"
                                src={image.imageCDN}
                                alt="image"
                                borderRadius="10px"
                                w="100%"
                                d="inline-block"
                                cursor="pointer"
                            // onClick={() => openImage(image._id)}
                            />
                        )
                    })
                }
            </Box>
        </>
    )
}
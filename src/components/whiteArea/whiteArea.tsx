import {
    Box,
    Flex,
    Image
} from '@chakra-ui/react'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import { UploadImageForm } from '../uploadImageForm/uploadImageForm'



export function WhiteArea({ children }: any) {

    

    return (
        <Box
            h="100%"
            w="100%"
            maxW="1200px"
            pt="10px"
        >
            <Flex
                h="100%"
                w="90%"
                bgColor="#F6F5FA"
                borderRadius="20px 20px 0 0"
                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                flexDirection="column"
                justify="center"
            >
                {/* <Box
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
                </Box> */}
                {/* <UploadImageForm /> */}
                {children}
            </Flex>
        </Box>
    )
}
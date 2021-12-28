import { Box, Flex, Grid, Text, VStack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FiImage, FiLogOut, FiSettings, FiFilePlus } from 'react-icons/fi'

export function Buttons() {

    const router = useRouter()

    return (
        <Grid templateColumns='repeat(2, 130px)' templateRows='repeat(2, 130px)' gap={4} mb="20px">
            <Flex
                height='100%'
                w="100%"
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
                borderRadius='12px'
                as="button"
                flexDirection="column"
                justify="center"
                align="center"
                onClick={() => router.push('/myAccount/uploadImage')}

            >
                <FiFilePlus size={70} strokeWidth="1" />
                <Text>Add Image</Text>
            </Flex>
            <Flex
                height='100%'
                w="100%"
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
                borderRadius='12px'
                as="button"
                flexDirection="column"
                justify="center"
                align="center"
                onClick={() => router.push('/myAccount/myGallery')}

            >
                <FiImage size={70} strokeWidth="1" />
                <Text>Gallery</Text>
            </Flex>
            <Flex
                height='100%'
                w="100%"
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
                borderRadius='12px'
                as="button"
                flexDirection="column"
                justify="center"
                align="center"
                onClick={() => router.push('/myAccount/accountInfo')}

            >
                <FiSettings size={70} strokeWidth="1" />
                <Text>Account</Text>
            </Flex>
            <Flex
                height='100%'
                w="100%"
                boxShadow='rgba(0, 0, 0, 0.24) 0px 3px 8px'
                borderRadius='12px'
                as="button"
                flexDirection="column"
                justify="center"
                align="center"
            >
                <FiLogOut size={70} strokeWidth="1" />
                <Text>Log Out</Text>
            </Flex>
        </Grid>
    )
}
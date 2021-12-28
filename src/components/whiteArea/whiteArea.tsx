import {
    Box,
    Flex,
} from '@chakra-ui/react'

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
                align="center"
            >
                {children}
            </Flex>
        </Box>
    )
}
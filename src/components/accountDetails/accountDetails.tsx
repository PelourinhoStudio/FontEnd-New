import { Divider, Flex, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";


export function AccountDetails() {

    const { user } = useContext(AuthContext)

    return (
        <>
            <Text fontWeight="bold" fontSize="40px" h="15%">Account Settings</Text>
        </>
    )
}
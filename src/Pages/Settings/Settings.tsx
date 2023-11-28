import { Center, Flex, Space, Divider } from "@mantine/core";
import Profits from "./Components/Profits";
import Distributors from "./Components/Distributors";
import CompanyNames from "./Components/CompanyNames";
import Sizes from "./Components/productSizes";

export default function Settings() {
    return (
        <>
            <Space h="lg" />
            <Center>
                <Flex direction={"column"} w="250px">
                    <Profits />
                    <Divider my="sm" variant="dashed" color="black" />
                    <Distributors />
                    <Divider my="xl" variant="dashed" color="black" />
                    <CompanyNames />
                    <Divider my="xl" variant="dashed" color="black" />
                    <Sizes />
                </Flex>
            </Center>
        </>
    );
}

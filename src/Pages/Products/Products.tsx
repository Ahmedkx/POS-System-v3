import { useState } from "react";
import { Box, Button, Flex, TextInput, rem } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import Head from "./Components/Head";
import Row from "./Components/Row";

export default function Products() {
    const [search, setSearch] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
    };

    const products = [
        {
            name: "منتج",
            company: 12.011,
            size: "50 سم",
            price: "1233",
            quantity: 123,
            barcode: 123,
        },
        {
            name: "2منتج",
            company: 12.011,
            size: "50 سم",
            price: "1233",
            quantity: 123,
            barcode: 123,
        },
        {
            name: "3منتج",
            company: 12.011,
            size: "50 سم",
            price: "1233",
            quantity: 123,
            barcode: 123,
        },
    ];

    return (
        <>
            <Box
                style={{
                    position: "sticky",
                    top: "65px",
                    background: "#f3f4f6",
                    paddingTop: rem(25),
                    zIndex: "1",
                }}
            >
                <Flex justify="space-between" gap={25}>
                    <Button leftSection={<IconPlus />}>اضافة منتج</Button>
                    <TextInput
                        placeholder="البحث"
                        mb="md"
                        leftSection={
                            <IconSearch
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />
                        }
                        value={search}
                        onChange={handleSearchChange}
                        style={{ flex: 1 }}
                    />
                </Flex>
                <Head />
            </Box>

            {products.map((product) => (
                <Row product={product} />
            ))}
        </>
    );
}

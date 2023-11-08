import { useState } from "react";
import {
    Box,
    Button,
    Flex,
    TextInput,
    rem,
    Loader,
    Center,
    SimpleGrid,
} from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import Head from "./Components/Head";
import Row from "./Components/Row";
import { Link } from "react-router-dom";
import Cell from "./Components/Cell";

export default function Products() {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
    };

    const products = [
        {
            id: "9312318237",
            name: " منتج منتج منتج منتج منتج منتج منتج منتج منتج منتج منتج منتج",
            company: 12.011,
            size: "50 سم",
            price: "1233",
            quantity: 123,
            barcode: 121231323,
        },
        {
            id: "9182312337",
            name: "2منتج",
            company: 12.011,
            size: "50 سم",
            price: "1233",
            quantity: 123,
            barcode: 123123123,
        },
        {
            id: "918123237",
            name: "3منتج",
            company: 12.011,
            size: "50 سم",
            price: "1233",
            quantity: 123,
            barcode: 121231233,
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
                    <Link to="/products/add">
                        <Button leftSection={<IconPlus />}>اضافة منتج</Button>
                    </Link>
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
                <SimpleGrid
                    cols={7}
                    mb={rem(5)}
                    pb={rem(10)}
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                >
                    <Cell>الاسم</Cell>
                    <Cell>العبوة</Cell>
                    <Cell>الشركة</Cell>
                    <Cell>السعر</Cell>
                    <Cell>سعر البيع</Cell>
                    <Cell>الكمية</Cell>
                    <Cell>تعديل</Cell>
                </SimpleGrid>
            </Box>

            {loading ? (
                <Center mt={100}>
                    <Loader size={50} />
                </Center>
            ) : (
                products.map((product) => (
                    <Row key={product.name} product={product} />
                ))
            )}
        </>
    );
}

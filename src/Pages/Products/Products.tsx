import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, TextInput, rem, Loader, Center, SimpleGrid } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import Row from "./Components/Row";
import Cell from "./Components/Cell";

import { useProductsStore } from "../../Store";

export default function Products() {
    const docs = useProductsStore((state) => state.products);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (searchText.length == 0) {
            setProducts(docs);
            setLoading(false);
            return;
        }
        function handleSearch(searchText) {
            let filteredProducts = docs.filter(
                (item) =>
                    item.name.includes(searchText) ||
                    item.company.includes(searchText) ||
                    item.size.includes(searchText) ||
                    item.barcode.toString().includes(searchText)
            );
            setProducts([...filteredProducts]);
        }
        handleSearch(searchText);
    }, [searchText, docs]);

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
                            <IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        }
                        onChange={(e) => setSearchText(e.target.value)}
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

            {products.map((product) => (
                <Row key={product.id} product={product} />
            ))}

            {loading && (
                <Center mt="lg">
                    <Loader m="auto" />
                </Center>
            )}
        </>
    );
}

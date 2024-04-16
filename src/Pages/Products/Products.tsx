import {
    Box,
    Button,
    Center,
    Flex,
    Loader,
    SimpleGrid,
    TextInput,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import Cell from "./Components/Cell";

// import docs from "../../data.json";
import { useLoginStore, useProductsStore } from "../../Store";
import Row from "./Components/Row";

export default function Products() {
    const docs = useProductsStore((state) => state.products);
    const isAdmin = useLoginStore((state) => state.admin);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useDebouncedState("", 100);

    // Function to handle search
    function handleSearch(searchText) {
        if (!searchText) {
            setProducts(docs);
            setLoading(false);
        } else {
            const filteredProducts = docs.filter(
                (item) =>
                    item.name.includes(searchText) ||
                    item.company.includes(searchText) ||
                    item.size.includes(searchText) ||
                    item.barcode.toString().includes(searchText.split(":")[0])
            );
            setProducts(filteredProducts);
            setLoading(false);
        }
    }

    // Effect for handling search
    useEffect(() => {
        handleSearch(searchText);
    }, [searchText, docs]);

    return (
        <>
            <Box
                style={{
                    position: "sticky",
                    top: "65px",
                    background: "#f3f4f6",
                    paddingTop: 25,
                    zIndex: 1,
                }}
            >
                <Flex justify="space-between" gap={25}>
                    {isAdmin && (
                        <Link to="/products/add">
                            <Button leftSection={<IconPlus />}>
                                اضافة منتج
                            </Button>
                        </Link>
                    )}
                    <TextInput
                        placeholder="البحث"
                        mb="md"
                        leftSection={<IconSearch />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ flex: 1 }}
                    />
                </Flex>
                <SimpleGrid
                    cols={8}
                    mb={5}
                    pb={10}
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                >
                    <Cell>الاسم</Cell>
                    <Cell>العبوة</Cell>
                    <Cell>الشركة</Cell>
                    {isAdmin && <Cell>السعر</Cell>}
                    <Cell>سعر البيع</Cell>
                    {isAdmin && <Cell>الكمية</Cell>}
                    <Cell>اخر تعديل للسعر</Cell>
                    {isAdmin && <Cell>تعديل</Cell>}
                </SimpleGrid>
            </Box>

            {loading ? (
                <Center mt="lg">
                    <Loader />
                </Center>
            ) : (
                <List
                    height={640}
                    itemCount={products.length}
                    itemSize={100}
                    width={"100%"}
                    style={{
                        direction: "rtl",
                    }}
                >
                    {({ index, style }) => (
                        <div style={style}>
                            {/* You might need to adjust this part to properly render each product */}
                            <Row product={products[index]}></Row>
                            {/* Add other product details */}
                        </div>
                    )}
                </List>
            )}
        </>
    );
}

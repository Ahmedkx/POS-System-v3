import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Box,
    Button,
    Flex,
    TextInput,
    SimpleGrid,
    ActionIcon,
    Tooltip,
    Loader,
    Center,
} from "@mantine/core";
import { IconPlus, IconSearch, IconPencil, IconPrinter } from "@tabler/icons-react";
import Cell from "./Components/Cell";
import { FixedSizeList as List } from "react-window";
import docs from "../../data.json"; // Assuming this is a mock and you have a way to fetch real data
import Row from "./Components/Row";

export default function Products() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");

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
                    item.barcode.toString().includes(searchText)
            );
            setProducts(filteredProducts);
            setLoading(false);
        }
    }

    // Effect for handling search
    useEffect(() => {
        handleSearch(searchText);
    }, [searchText]);

    return (
        <>
            <Box
                style={{
                    position: "sticky",
                    top: "65px",
                    background: "#f3f4f6",
                    paddingTop: 25, // using px directly, consider using a consistent unit like rem if needed
                    zIndex: 1,
                }}
            >
                <Flex justify="space-between" gap={25}>
                    <Link to="/products/add">
                        <Button leftIcon={<IconPlus />}>اضافة منتج</Button>
                    </Link>
                    <TextInput
                        placeholder="البحث"
                        mb="md"
                        // icon={<IconSearch />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ flex: 1 }}
                    />
                </Flex>
                <SimpleGrid cols={7} mb={5} pb={10} style={{ borderBottom: "1px solid #e0e0e0" }}>
                    {/* Header cells */}
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
                <Center mt="lg">
                    <Loader />
                </Center>
            ) : (
                <List
                    height={400}
                    itemCount={products.length}
                    itemSize={100}
                    width="100%"
                    style={{ direction: "rtl" }}
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

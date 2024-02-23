import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Flex, TextInput, rem, Loader, Center, SimpleGrid } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
// import Row from "./Components/Row";
import Cell from "./Components/Cell";
import { FixedSizeList as List } from "react-window";

import { ActionIcon, Tooltip } from "@mantine/core";
import { IconPencil, IconPrinter } from "@tabler/icons-react";

// import { useProductsStore } from "../../Store";
import docs from "../../data.json";

export default function Products() {
    // const docs = useProductsStore((state) => state.products);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        if (searchText.length == 0) {
            setProducts(docs);
            setLoading(false);
            return;
        } else {
            handleSearch(searchText);
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

            <List
                className="List"
                height={400}
                itemCount={docs.length}
                itemSize={65}
                width="100%"
                style={{ direction: "rtl" }}
            >
                {Row}
            </List>

            {/* {products.map((product) => (
                <Row key={product.barcode} product={product} />
                <div key={product.barcode}>{product.name}</div>
            ))} */}

            {/* {loading && (
                <Center mt="lg">
                    <Loader m="auto" />
                </Center>
            )} */}
        </>
    );
}

function Row({ index }: any) {
    const product = docs[index];
    // const [printModal, setPrintModal] = useState(false);
    // const [addModal, setAddModal] = useState(false);

    return (
        <div>
            {/* <AddModal opened={addModal} setOpened={setAddModal} product={product} />
            <PrintModal opened={printModal} setOpened={setPrintModal} barcode={product.barcode} /> */}

            <SimpleGrid
                cols={7}
                style={{ borderBottom: "1px solid #e0e0e0" }}
                pb={rem(10)}
                pt={rem(10)}
            >
                <Cell>{docs[index].name}</Cell>
                <Cell>{docs[index].size}</Cell>
                <Cell>{docs[index].company}</Cell>
                <Cell>{docs[index].price}</Cell>
                <Cell>{docs[index].sellPrice1}</Cell>
                {/* <Cell>{useCalculateSellPrice(product.price)}</Cell> */}
                <Cell>{docs[index].quantity}</Cell>
                <Flex gap={5} justify={"center"} align={"center"}>
                    <ActionIcon
                        variant="default"
                        size="xl"
                        radius="xl"
                        aria-label="Settings"
                        // onClick={() => setAddModal(true)}
                    >
                        <Tooltip label="اضافة" offset={10} withArrow>
                            <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
                        </Tooltip>
                    </ActionIcon>

                    <ActionIcon
                        variant="default"
                        size="xl"
                        radius="xl"
                        aria-label="Settings"
                        // onClick={() => setPrintModal(true)}
                        disabled={!product.autoBarcode}
                    >
                        <Tooltip label="طباعة الباركود" offset={10} withArrow>
                            <IconPrinter style={{ width: "70%", height: "70%" }} stroke={1.5} />
                        </Tooltip>
                    </ActionIcon>

                    <Link to={`/products/edit/${product.id}`}>
                        <ActionIcon variant="default" size="xl" radius="xl" aria-label="Settings">
                            <Tooltip label="تعديل" offset={10} withArrow>
                                <IconPencil style={{ width: "70%", height: "70%" }} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>
                    </Link>
                </Flex>
            </SimpleGrid>
        </div>
    );
}

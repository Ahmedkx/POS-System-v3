import {
    Box,
    Button,
    Center,
    Flex,
    Loader,
    SimpleGrid,
    TextInput,
    Table,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FixedSizeList as List } from "react-window";
import Cell from "./Components/Cell";
import { ActionIcon, Tooltip } from "@mantine/core";
import {
    IconPencil,
    IconPlus,
    IconPrinter,
    IconCoinPound,
} from "@tabler/icons-react";
// import docs from "../../data.json";
import { useLoginStore, useProductsStore } from "../../Store";
import Row from "./Components/Row";
import AddModal from "./Components/AddModal";
import PrintModal from "./Components/PrintModal";
import ChangePriceModal from "./Components/ChnagePriceModal";

export default function Products() {
    const [printModal, setPrintModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [changePriceModal, setChangePriceModal] = useState(false);
    const [modalData, setModalData] = useState(null);

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

    function daysAgo(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        const now = new Date();
        const difference = now - date;
        const daysAgo = difference / (1000 * 60 * 60 * 24);
        const numberOfDays = Math.floor(daysAgo);

        if (numberOfDays || numberOfDays == 0) {
            return `منذ ${numberOfDays} يوم`;
        }
    }

    return (
        <>
            <AddModal
                opened={addModal}
                // product={product}
                product={modalData || []}
            />
            <PrintModal
                opened={printModal}
                // barcode={product.barcode}
                barcode={modalData || [0]}
            />
            <ChangePriceModal
                opened={changePriceModal}
                // id={product.id}
                id={modalData || 0}
                setOpened={setChangePriceModal}
            />

            <Table highlightOnHover withColumnBorders>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>الاسم</Table.Th>
                        <Table.Th>العبوة</Table.Th>
                        <Table.Th>الشركة</Table.Th>
                        <Table.Th>السعر</Table.Th>
                        <Table.Th>سعر البيع</Table.Th>
                        <Table.Th>الكمية</Table.Th>
                        <Table.Th>اخر تعديل للسعر</Table.Th>
                        <Table.Th>تعديل</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {docs.map((product) => (
                        <Table.Tr key={product.name} fw="bold">
                            <Table.Td>{product.name}</Table.Td>
                            <Table.Td>{product.size}</Table.Td>
                            <Table.Td>{product.company}</Table.Td>
                            <Table.Td>{product.price}</Table.Td>
                            <Table.Td>{product.sellPrice1}</Table.Td>
                            <Table.Td>{product.quantity}</Table.Td>
                            <Table.Td>
                                {daysAgo(product?.lastUpdated?.seconds)}
                            </Table.Td>
                            <Table.Td>
                                <Flex gap={5}>
                                    <ActionIcon
                                        variant="default"
                                        size="xl"
                                        radius="xl"
                                        aria-label="Settings"
                                        onClick={() => {
                                            setAddModal(true);
                                            setModalData(product);
                                        }}
                                    >
                                        <Tooltip
                                            label="اضافة"
                                            offset={10}
                                            withArrow
                                        >
                                            <IconPlus
                                                style={{
                                                    width: "70%",
                                                    height: "70%",
                                                }}
                                                stroke={1.5}
                                            />
                                        </Tooltip>
                                    </ActionIcon>

                                    <ActionIcon
                                        variant="default"
                                        size="xl"
                                        radius="xl"
                                        aria-label="Settings"
                                        onClick={() => {
                                            setChangePriceModal(true);
                                            setModalData(product.barcode);
                                        }}
                                    >
                                        <Tooltip
                                            label="تعديل السعر"
                                            offset={10}
                                            withArrow
                                        >
                                            <IconCoinPound
                                                style={{
                                                    width: "70%",
                                                    height: "70%",
                                                }}
                                                stroke={1.5}
                                            />
                                        </Tooltip>
                                    </ActionIcon>

                                    <ActionIcon
                                        variant="default"
                                        size="xl"
                                        radius="xl"
                                        aria-label="Settings"
                                        onClick={() => {
                                            setPrintModal(true);
                                            setModalData(product.id);
                                        }}
                                    >
                                        <Tooltip
                                            label="طباعة الباركود"
                                            offset={10}
                                            withArrow
                                        >
                                            <IconPrinter
                                                style={{
                                                    width: "70%",
                                                    height: "70%",
                                                }}
                                                stroke={1.5}
                                            />
                                        </Tooltip>
                                    </ActionIcon>

                                    <Link to={`/products/edit/${product.id}`}>
                                        <ActionIcon
                                            variant="default"
                                            size="xl"
                                            radius="xl"
                                            aria-label="Settings"
                                        >
                                            <Tooltip
                                                label="تعديل"
                                                offset={10}
                                                withArrow
                                            >
                                                <IconPencil
                                                    style={{
                                                        width: "70%",
                                                        height: "70%",
                                                    }}
                                                    stroke={1.5}
                                                />
                                            </Tooltip>
                                        </ActionIcon>
                                    </Link>
                                </Flex>
                            </Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </>
        // <>
        //     <Box
        //         style={{
        //             position: "sticky",
        //             top: "65px",
        //             background: "#f3f4f6",
        //             paddingTop: 25,
        //             zIndex: 1,
        //         }}
        //     >
        //         <Flex justify="space-between" gap={25}>
        //             {isAdmin && (
        //                 <Link to="/products/add">
        //                     <Button leftSection={<IconPlus />}>
        //                         اضافة منتج
        //                     </Button>
        //                 </Link>
        //             )}
        //             <TextInput
        //                 placeholder="البحث"
        //                 mb="md"
        //                 leftSection={<IconSearch />}
        //                 onChange={(e) => setSearchText(e.target.value)}
        //                 style={{ flex: 1 }}
        //             />
        //         </Flex>
        //         <SimpleGrid
        //             cols={8}
        //             mb={5}
        //             pb={10}
        //             style={{ borderBottom: "1px solid #e0e0e0" }}
        //         >
        //             <Cell>الاسم</Cell>
        //             <Cell>العبوة</Cell>
        //             <Cell>الشركة</Cell>
        //             {isAdmin && <Cell>السعر</Cell>}
        //             <Cell>سعر البيع</Cell>
        //             {isAdmin && <Cell>الكمية</Cell>}
        //             <Cell>اخر تعديل للسعر</Cell>
        //             {isAdmin && <Cell>تعديل</Cell>}
        //         </SimpleGrid>
        //     </Box>

        //     {loading ? (
        //         <Center mt="lg">
        //             <Loader />
        //         </Center>
        //     ) : (
        //         <List
        //             height={640}
        //             itemCount={products.length}
        //             itemSize={100}
        //             width={"100%"}
        //             style={{
        //                 direction: "rtl",
        //             }}
        //         >
        //             {({ index, style }) => (
        //                 <div style={style}>
        //                     {/* You might need to adjust this part to properly render each product */}
        //                     <Row product={products[index]}></Row>
        //                     {/* Add other product details */}
        //                 </div>
        //             )}
        //         </List>
        //     )}
        // </>
    );
}

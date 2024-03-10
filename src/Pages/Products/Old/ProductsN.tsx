import { useEffect, useState, forwardRef } from "react";
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
    Table,
    ScrollArea,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconPlus, IconSearch, IconPencil, IconPrinter } from "@tabler/icons-react";
import Cell from "./Components/Cell";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// import docs from "../../data.json";
import Row from "./Components/Row";
import { useLoginStore, useProductsStore } from "../../Store";
import { MonthPicker } from "@mantine/dates";
import useFormattedDate from "../../Hooks/useFormattedDate";

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
                    item.barcode.toString().includes(searchText)
            );
            setProducts(filteredProducts);
            setLoading(false);
        }
    }

    // Effect for handling search
    useEffect(() => {
        handleSearch(searchText);
    }, [searchText, docs]);

    const outter = forwardRef((props, ref) => <Table.Tbody ref={ref} {...props}></Table.Tbody>);

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
                            <Button leftSection={<IconPlus />}>اضافة منتج</Button>
                        </Link>
                    )}
                    <TextInput
                        placeholder="البحث"
                        mb="md"
                        // icon={<IconSearch />}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ flex: 1 }}
                    />
                </Flex>
            </Box>
            <Table stickyHeader stickyHeaderOffset={140}>
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
                {/* <Table.Tbody fw="bold"> */}
                <List
                    height={1920}
                    itemCount={products.length}
                    itemSize={100}
                    width={1080}
                    style={{
                        direction: "rtl",
                    }}
                    outerElementType={outter}
                >
                    {({ index, style }) => (
                        <Table.Tr key={products[index].name} style={style}>
                            <Table.Td>{products[index]?.name}</Table.Td>
                            <Table.Td>{products[index]?.size}</Table.Td>
                            <Table.Td>{products[index]?.company}</Table.Td>
                            <Table.Td>{products[index]?.price}</Table.Td>
                            <Table.Td>{products[index]?.sellPrice1}</Table.Td>
                            <Table.Td>{products[index]?.quantity}</Table.Td>
                            <Table.Td>
                                {useFormattedDate(products[index].lastUpdated?.seconds)}
                            </Table.Td>
                            <Table.Td>{products[index]?.quantity}</Table.Td>
                        </Table.Tr>
                    )}
                </List>
                {/* </Table.Tbody> */}
            </Table>
        </>
    );
}

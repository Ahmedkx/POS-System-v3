import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase-config";
import {
    collection,
    doc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,
    startAt,
} from "firebase/firestore";
import { Box, Button, Flex, TextInput, rem, Loader, Center, SimpleGrid } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import Row from "./Components/Row";
import Cell from "./Components/Cell";

export default function Products() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    });

    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
    };

    async function getMoreProducts() {
        const q = query(
            collection(db, "Products"),
            orderBy("name", "asc"),
            startAfter(products[products.length - 1].name),
            limit(5)
        );

        const docs = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
            docData.id = doc.id;
            docs.push(docData);
        });
        setProducts((prev) => prev.concat(docs));
        setLoading(false);
        setFetching(false);
        console.log("docs => ", docs);
    }

    console.log(products.length);

    // useEffect(() => {
    //     const q = query(collection(db, "Products"), orderBy("name"), limit(15));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const cities = [];
    //         querySnapshot.forEach((doc) => {
    //             const cityData = doc.data();
    //             cityData.id = doc.id;
    //             cities.push(cityData);
    //         });
    //         setProducts((prev) => prev.concat(cities));
    //         setLoading(false);
    //         console.log("useEffect");
    //     });
    // }, []);

    useEffect(() => {
        async function getData() {
            const q = query(
                collection(db, "Products"),
                // startAfter(products[products.length - 1] || null),
                orderBy("name", "asc"),
                limit(10)
            );

            const docs = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                docData.id = doc.id;
                docs.push(docData);
            });
            setProducts((prev) => prev.concat(docs));
            setLoading(false);
            console.log("Sending");
        }
        getData();
    }, []);

    // useEffect(() => {
    //     setFetching(true);
    //     getMoreProducts();
    // }, [entry?.isIntersecting]);

    if (loading) {
        return (
            <Center pt={100}>
                <Loader size={50} />
            </Center>
        );
    }

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

            {products.map((product, i) => (
                <Row key={product.id} product={product} />
            ))}

            <Center mt="lg">
                <Loader
                    m="auto"
                    onClick={() => {
                        getMoreProducts();
                    }}
                    ref={ref}
                />
            </Center>
        </>
    );
}

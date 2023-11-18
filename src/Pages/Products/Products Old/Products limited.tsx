import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase-config";
import {
    collection,
    doc,
    endAt,
    getDoc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    startAfter,
    startAt,
    where,
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

    const [loading, setLoading] = useState(false);
    const [lastDoc, setLastDoc] = useState(null);
    const [isDone, setIsDone] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [products, setProducts] = useState([]);

    async function getSearchResults() {
        // if (searchText < 1) {
        const first = query(
            collection(db, "Products"),
            orderBy("name"),
            limit(5),
            startAt(searchText),
            endAt(searchText + "\uf8ff")
        );
        const documentSnapshots = await getDocs(first);
        const docs: { id: string }[] = [];
        documentSnapshots.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() });
        });
        setProducts(docs);
        setLoading(false);
        console.log("Text");
        // }
    }

    async function getData() {
        if (!isDone) {
            const first = query(
                collection(db, "Products"),
                limit(15),
                orderBy("name"),
                startAfter(lastDoc)
            );
            const documentSnapshots = await getDocs(first);
            const docs: { id: string }[] = [];
            documentSnapshots.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setProducts((prev) => [...prev, ...docs]);
            setLastDoc(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
            setLoading(false);
            if (docs.length == 0) {
                setIsDone(true);
            }
        }
    }

    useEffect(() => {
        getSearchResults();
        if (searchText.length < 1) {
            getSearchResults();
        } else {
            setIsDone(false);
            // getData();
        }
        if (entry?.isIntersecting) {
            if (loading === false) {
                setLoading(true);
                // getData();
            }
        }
    }, [entry?.isIntersecting, searchText]);

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

            {!isDone && (
                <Center mt="lg">
                    <Loader m="auto" ref={ref} />
                </Center>
            )}
        </>
    );
}

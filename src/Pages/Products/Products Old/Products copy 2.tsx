import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../Firebase-config";
import {
    collection,
    doc,
    getDoc,
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
    // const [fetching, setFetching] = useState(true);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        setSearch(value);
    };

    async function getMoreProducts() {
        const docSnap = await getDoc(
            doc(collection(db, "Products"), products[products.length - 1].id)
        );

        console.log(docSnap);

        const q = query(collection(db, "Products"), limit(5), orderBy("name"), startAfter(docSnap));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setProducts((prev) => [...prev, ...docs]);
            setLoading(false);
            console.log(docs);
        });
    }

    useEffect(() => {
        const q = query(collection(db, "Products"), limit(5), orderBy("name"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setProducts(docs);
            setLoading(false);
        });
    }, []);

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
                <Button
                    onClick={() => {
                        getMoreProducts();
                    }}
                >
                    Load More
                </Button>
                {/* <Loader m="auto" /> */}
            </Center>
        </>
    );
}

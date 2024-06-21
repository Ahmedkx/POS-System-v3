import { ActionIcon, Flex, ScrollArea, Table } from "@mantine/core";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import {
    collection,
    deleteDoc,
    doc,
    increment,
    onSnapshot,
    orderBy,
    query,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase-config";
import { useLoginStore } from "../../Store";

export default function ExpiryDates() {
    const isAdmin = useLoginStore((state) => state.admin);
    const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     async function getData() {
    //         const q = query(
    //             collection(db, "Quantities"),
    //             orderBy("expiryDate")
    //             // limit(50)
    //         );

    //         const querySnapshot = await getDocs(q);
    //         const data = [];
    //         querySnapshot.forEach((doc) => {
    //             data.push({ docId: doc.id, ...doc.data() });
    //         });
    //         setProducts(data);
    //     }
    //     getData();
    // }, []);

    useEffect(() => {
        const q = query(
            collection(db, "Quantities"),
            orderBy("expiryDate")
            // limit(50)
        );

        // The onSnapshot method returns an unsubscribe function that can be called to stop listening for updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push({ docId: doc.id, ...doc.data() });
            });
            setProducts(data);
        });

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array means this effect runs once on mount

    function convertUnixTimestampToMMYY(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
        const mm = date.getMonth() + 1; // Get month
        // const formattedMonth = mm < 10 ? mm.toString() : mm.toString().padStart(2, "0"); // Pad with zero if month is less than 10
        const yy = date.getFullYear().toString(); // Get last two digits of the year
        return `${yy}/${mm}`;
    }

    async function editQuantity(id, amount) {
        const docRef = doc(db, "Quantities", id);
        await updateDoc(docRef, {
            quantity: increment(amount),
        });
    }

    async function deleteDocById(id) {
        await deleteDoc(doc(db, "Quantities", id));
    }

    const rows = products.map((product, i) => (
        <Table.Tr key={i}>
            <Table.Td>{product?.name}</Table.Td>
            <Table.Td>{product?.quantity}</Table.Td>
            <Table.Td>
                {convertUnixTimestampToMMYY(product?.expiryDate)}
            </Table.Td>
            {isAdmin && (
                <Table.Td>
                    <Flex gap="md">
                        <ActionIcon
                            radius="xl"
                            onClick={() => editQuantity(product.docId, 1)}
                        >
                            <IconPlus />
                        </ActionIcon>
                        <ActionIcon
                            radius="xl"
                            onClick={() => editQuantity(product.docId, -1)}
                        >
                            <IconMinus />
                        </ActionIcon>
                        <ActionIcon
                            variant="filled"
                            color="red"
                            radius="xl"
                            onClick={() => deleteDocById(product.docId)}
                        >
                            <IconX />
                        </ActionIcon>
                    </Flex>
                </Table.Td>
            )}
        </Table.Tr>
    ));

    return (
        <ScrollArea w="100%">
            <Table
                highlightOnHover
                highlightOnHoverColor="lightgray"
                withTableBorder
                withColumnBorders
                stickyHeader
            >
                <Table.Thead>
                    <Table.Tr fz="xl" fw="bold">
                        <Table.Th>الاسم</Table.Th>
                        <Table.Th>الكمية</Table.Th>
                        <Table.Th>التاريخ</Table.Th>
                        {isAdmin && <Table.Th>تعديل</Table.Th>}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody fz="xl" fw="bold">
                    {rows}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
}

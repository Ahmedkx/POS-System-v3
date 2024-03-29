import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../Firebase-config";
import { Container, ScrollArea, Table } from "@mantine/core";

export default function ExpiryDates() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getData() {
            const q = query(
                collection(db, "Quantities"),
                orderBy("expiryDate")
                // limit(50)
            );

            const querySnapshot = await getDocs(q);
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            setProducts(data);
        }
        getData();
    }, []);

    function convertUnixTimestampToMMYY(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
        const mm = date.getMonth() + 1; // Get month
        // const formattedMonth = mm < 10 ? mm.toString() : mm.toString().padStart(2, "0"); // Pad with zero if month is less than 10
        const yy = date.getFullYear().toString(); // Get last two digits of the year
        return `${yy}/${mm}`;
    }

    const rows = products.map((product, i) => (
        <Table.Tr key={i}>
            <Table.Td>{product?.name}</Table.Td>
            <Table.Td>{product?.quantity}</Table.Td>
            <Table.Td>
                {convertUnixTimestampToMMYY(product?.expiryDate)}
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <ScrollArea w="100%">
            <Table highlightOnHover stickyHeader={true}>
                <Table.Thead>
                    <Table.Tr fz="xl" fw="bold">
                        <Table.Th>الاسم</Table.Th>
                        <Table.Th>الكمية</Table.Th>
                        <Table.Th>التاريخ</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody fz="xl" fw="bold">
                    {rows}
                </Table.Tbody>
            </Table>
        </ScrollArea>
    );
}

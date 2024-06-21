import { Button, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddCustomerModal from "./Components/AddCustomerModal";

export default function Customers() {
    const [opened, { open, close }] = useDisclosure(false);

    const rows = products.map((product, i) => (
        <Table.Tr key={i}>
            <Table.Td>{product?.name}</Table.Td>
            <Table.Td>{product?.quantity}</Table.Td>
        </Table.Tr>
    ));

    return (
        <div>
            <AddCustomerModal opened={opened} close={close} />
            {/* 
            <Text size="xl" fw="bold" mb="lg">
                العملاء
            </Text> */}
            <Button onClick={open}>اضافة عميل</Button>
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
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody fz="xl" fw="bold">
                    {rows}
                </Table.Tbody>
            </Table>
        </div>
    );
}

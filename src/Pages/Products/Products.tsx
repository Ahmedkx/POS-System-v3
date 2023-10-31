import { Table, Text } from "@mantine/core";

export default function Products() {
    const elements = [
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
        { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
        { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
        { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
        { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
        { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
    ];

    const rows = elements.map((element) => (
        <Table.Tr key={element.name} style={{ cursor: "pointer" }}>
            <Table.Td>{element.position}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
        </Table.Tr>
    ));

    const ths = (
        <Table.Tr>
            <Table.Th>الاسم</Table.Th>
            <Table.Th>الشركة</Table.Th>
            <Table.Th>السعر</Table.Th>
            <Table.Th>سعر الجمهور</Table.Th>
            <Table.Th>سعر الطبيب</Table.Th>
            <Table.Th>سعر المزرعة</Table.Th>
            <Table.Th>الكمية</Table.Th>
            <Table.Th>الكمية</Table.Th>
        </Table.Tr>
    );

    return (
        <>
            <Text size="xl" mb="xl">
                الأدوية
            </Text>

            <Table striped highlightOnHover withTableBorder withColumnBorders>
                <Table.Thead style={{ position: "sticky", top: "0" }}>
                    {ths}
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </>
    );
}

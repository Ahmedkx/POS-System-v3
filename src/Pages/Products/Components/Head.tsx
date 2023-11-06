import { SimpleGrid, rem } from "@mantine/core";
import Cell from "./Cell";

export default function Head() {
    return (
        <SimpleGrid
            cols={8}
            mb={rem(5)}
            pb={rem(10)}
            style={{ borderBottom: "1px solid #e0e0e0" }}
        >
            <Cell>الاسم</Cell>
            <Cell>العبوة</Cell>
            <Cell>الشركة</Cell>
            <Cell>السعر</Cell>
            <Cell>السعر</Cell>
            <Cell>السعر</Cell>
            <Cell>الكمية</Cell>
            <Cell>تعديل</Cell>
        </SimpleGrid>
    );
}

import cx from "clsx";
import {
    Group,
    Paper,
    ScrollArea,
    SimpleGrid,
    Table,
    Text,
} from "@mantine/core";
import {
    IconUserPlus,
    IconReceipt2,
    IconPackages,
    IconCoin,
    IconArrowUpRight,
    IconArrowDownRight,
} from "@tabler/icons-react";
import classes from "./StatsGrid.module.css";
import {
    collection,
    query,
    where,
    getAggregateFromServer,
    sum,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../Firebase-config";
import { useLoginStore } from "../../Store";

const icons = {
    user: IconUserPlus,
    receipt: IconReceipt2,
    coin: IconCoin,
    package: IconPackages,
};

export default function Statistics() {
    const isAdmin = useLoginStore((state) => state.admin);

    const [docs, setDocs] = useState([]);
    const [todaySales, setTodaySales] = useState(0);
    const [todayProfit, setTodayProfit] = useState(0);
    const [todaySoldProducts, setTodaySoldProducts] = useState(0);
    const [scrolled, setScrolled] = useState(false);

    const getTodayLocalRange = () => {
        const now = new Date();
        // Start of the day
        const start = new Date(now.setHours(0, 0, 0, 0));
        // End of the day
        const end = new Date(now.setHours(23, 59, 59, 999));

        return { start, end };
    };
    const { start, end } = getTodayLocalRange();

    const data = [
        {
            title: "مبيعات اليوم",
            icon: "receipt",
            value: todaySales + " جنيه",
            diff: 34,
        },
        {
            title: "أرباح اليوم",
            icon: "coin",
            value: todayProfit + " جنيه",
            diff: -13,
        },
        {
            title: "المنتجات المباعة",
            icon: "package",
            value: todaySoldProducts,
            diff: 18,
        },
    ] as const;

    useEffect(() => {
        async function getData() {
            const coll = collection(db, "Sales");
            const q = query(
                coll,
                where("timeStamp", ">=", start),
                where("timeStamp", "<=", end)
            );
            const querySnapshot = await getDocs(q);

            let documents = []; // Array to hold your documents
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                documents.push(data);
            });
            setDocs(documents);

            const snapshot = await getAggregateFromServer(q, {
                todaySales: sum("totalPrice"),
                todayProfit: sum("totalProfit"),
                todaySoldProducts: sum("totalQuantity"),
            });
            setTodaySales(snapshot.data().todaySales);
            setTodayProfit(snapshot.data().todayProfit);
            setTodaySoldProducts(snapshot.data().todaySoldProducts);
        }
        getData();
    }, []);

    const stats = data.map((stat) => {
        const Icon = icons[stat.icon];
        const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

        return (
            <Paper withBorder p="md" radius="md" key={stat.title}>
                <Group>
                    <Icon className={classes.icon} size="2.4rem" stroke={1.5} />
                    <Text size="xl" c="dimmed" className={classes.title}>
                        {stat.title}
                    </Text>
                </Group>

                <Group align="flex-end" gap="xs" mt="sm" mr="sm">
                    <Text className={classes.value} fw="bold" size="xl">
                        {stat.value}
                    </Text>
                    {/* <Text
                        c={stat.diff > 0 ? "teal" : "red"}
                        fz="sm"
                        fw={500}
                        className={classes.diff}
                    >
                        <span>{stat.diff}%</span>
                        <DiffIcon size="1rem" stroke={1.5} />
                    </Text> */}
                </Group>

                {/* <Text fz="xs" c="dimmed" mt={7}>
                    Compared to previous month
                </Text> */}
            </Paper>
        );
    });

    const rows = docs.map((transaction, index) => {
        return transaction?.products?.map((product, productIndex) => (
            <Table.Tr key={`${index}-${productIndex}`}>
                <Table.Td>{`${product.name} ${product.size}`}</Table.Td>
                <Table.Td>{product.company}</Table.Td>
                <Table.Td>{product.quantity}</Table.Td>
                <Table.Td>{product.sellPrice1}</Table.Td>
                <Table.Td>{product.sellPrice1 * product.quantity}</Table.Td>
            </Table.Tr>
        ));
    });

    if (!isAdmin) {
        return null;
    }

    return (
        <div className={classes.root}>
            <Text size="xl" fw="bold" mb="lg">
                الاحصائيات
            </Text>
            <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{stats}</SimpleGrid>
            <Text size="xl" fw="bold" my="lg">
                مبيعات اليوم
            </Text>
            <ScrollArea
                h="400"
                mt="lg"
                onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
                type="always"
            >
                <Table miw={700} striped highlightOnHover withColumnBorders>
                    <Table.Thead
                        className={cx(classes.header, {
                            [classes.scrolled]: scrolled,
                        })}
                    >
                        <Table.Tr>
                            <Table.Th>الاسم</Table.Th>
                            <Table.Th>الشركة</Table.Th>
                            <Table.Th>الكمية</Table.Th>
                            <Table.Th>سعر البيع</Table.Th>
                            <Table.Th>الاجمالى</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
        </div>
    );
}

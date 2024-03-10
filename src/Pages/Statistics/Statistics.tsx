import { useEffect, useState } from "react";
import { Box, Flex, Grid, Paper, Select, Title } from "@mantine/core";
import AreaChartGraph from "./Components/AreaChartGraph";
import Cards from "./Components/Cards";
import classes from "./Statistics.module.css";
import { useLoginStore } from "../../Store";
import { useNavigate } from "react-router-dom";
// import { AreaChart } from "recharts";
import { AreaChart } from "@mantine/charts";

export default function Statistics() {
    const navigate = useNavigate();
    const [graphSelect, setGraphSelect] = useState("أرباح");
    const admin = useLoginStore((state) => state.admin);

    useEffect(() => {
        if (!admin) {
            navigate("/");
        }
    }, []);

    const data = [
        {
            date: "Mar 22",
            Apples: 2890,
            Oranges: 2338,
            Tomatoes: 2452,
        },
        {
            date: "Mar 23",
            Apples: 2756,
            Oranges: 2103,
            Tomatoes: 2402,
        },
        {
            date: "Mar 24",
            Apples: 3322,
            Oranges: 986,
            Tomatoes: 1821,
        },
        {
            date: "Mar 25",
            Apples: 3470,
            Oranges: 2108,
            Tomatoes: 2809,
        },
        {
            date: "Mar 26",
            Apples: 3129,
            Oranges: 1726,
            Tomatoes: 2290,
        },
    ];

    const test = "H";
    console.log("🚀 ~ Statistics ~ test:", test);

    return (
        <Grid pt="lg" w="100%">
            {/* <Grid.Col span={12}>
                <Title order={2}>الاحصائيات</Title>
            </Grid.Col> */}

            {admin && <Cards />}

            {/* <AreaChart
                h={300}
                data={data}
                dataKey="date"
                withGradient={false}
                yAxisProps={{ domain: [0, 100] }}
                series={[{ name: "Apples", color: "indigo.6" }]}
            /> */}

            {/* <Grid.Col span={12}>
                <Paper radius="lg" p="xl">
                    <Flex gap={10}>
                        <Title order={2} mb="md">
                            تقرير
                        </Title>
                        <Select
                            classNames={{ dropdown: classes.dropdown }}
                            w="120"
                            radius="xl"
                            value={graphSelect}
                            data={["أرباح", "مبيعات"]}
                            onChange={(e: any) => setGraphSelect(e)}
                        />
                    </Flex>
                    <Box style={{ width: "100%", height: "500px" }}>
                        <AreaChartGraph />
                    </Box>
                </Paper>
            </Grid.Col> */}
        </Grid>
    );
}

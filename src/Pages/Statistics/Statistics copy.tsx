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

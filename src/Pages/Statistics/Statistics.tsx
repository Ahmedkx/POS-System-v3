import { useState } from "react";
import { Box, Flex, Grid, Paper, Select, Title } from "@mantine/core";
import AreaChartGraph from "./Components/AreaChartGraph";
import Cards from "./Components/Cards";
import classes from "./Statistics.module.css";

export default function Statistics() {
    const [graphSelect, setGraphSelect] = useState("أرباح");

    return (
        <Grid pt="lg">
            {/* <Grid.Col span={12}>
                <Title order={2}>الاحصائيات</Title>
            </Grid.Col> */}

            <Cards />

            <Grid.Col span={12}>
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
            </Grid.Col>
        </Grid>
    );
}

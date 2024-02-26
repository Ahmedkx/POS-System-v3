import { useEffect, useState } from "react";
import { Box, Flex, Grid, Paper, Select, Title } from "@mantine/core";
import AreaChartGraph from "./Components/AreaChartGraph";
import Cards from "./Components/Cards";
import classes from "./Statistics.module.css";
import { useLoginStore } from "../../Store";
import { useNavigate } from "react-router-dom";

export default function Statistics() {
    const navigate = useNavigate();
    const [graphSelect, setGraphSelect] = useState("أرباح");
    const permission = useLoginStore((state) => state.permission);

    useEffect(() => {
        if (permission == "guest") {
            navigate("/");
            console.log("run");
        }
    }, []);

    return (
        <Grid pt="lg">
            {/* <Grid.Col span={12}>
                <Title order={2}>الاحصائيات</Title>
            </Grid.Col> */}

            <Cards />

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

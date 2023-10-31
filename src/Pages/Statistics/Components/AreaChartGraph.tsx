import { Text } from "@mantine/core";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const data = [
    { name: "1", value: 4721 },
    { name: "2", value: 8456 },
    { name: "3", value: 6283 },
    { name: "4", value: 5894 },
    { name: "5", value: 7732 },
    { name: "6", value: 2387 },
    { name: "7", value: 1976 },
    { name: "8", value: 5129 },
    { name: "9", value: 6725 },
    { name: "10", value: 3056 },
    { name: "11", value: 8941 },
    { name: "12", value: 7193 },
    { name: "13", value: 1543 },
    { name: "14", value: 4785 },
    { name: "15", value: 6374 },
    { name: "16", value: 8401 },
    { name: "17", value: 5629 },
    { name: "18", value: 9324 },
    { name: "19", value: 1967 },
    { name: "20", value: 7198 },
    { name: "21", value: 6872 },
    { name: "22", value: 3147 },
    { name: "23", value: 8612 },
    { name: "24", value: 7248 },
    { name: "25", value: 3076 },
    { name: "26", value: 5439 },
    { name: "27", value: 6993 },
    { name: "28", value: 1585 },
    { name: "29", value: 5312 },
    { name: "30", value: 3000 },
];

const CustomTooltip = ({ payload }) => {
    return (
        <div
            style={{
                color: "white",
                background: "#637EB4",
                margin: "5",
                padding: "5px",
                borderRadius: "8px 8px 8px 0px",
            }}
        >
            <span>{payload[0]?.value}</span>
            <span> </span>
            <span>جنيه</span>
        </div>
    );
};

export default function AreaChartGraph() {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                // width={500}
                // height={400}
                data={data}
                margin={{ top: 0, right: 5, left: 5, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                            offset="5%"
                            stopColor="#0561FC"
                            stopOpacity={0.17}
                        />
                        <stop
                            offset="95%"
                            stopColor="#0561FC"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>
                <CartesianGrid />
                <XAxis dataKey="name" domain={[0, "dataMax"]} />
                <YAxis tickSize={60} tickLine={false} />
                <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                        stroke: "#0561FC",
                        strokeWidth: 2,
                        strokeDasharray: 5,
                    }}
                />
                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#9FC1FB"
                    strokeWidth="3"
                    fill="url(#colorUv)"
                    // dot={true}
                    activeDot={{ stroke: "#0561FC", strokeWidth: 6, r: 8 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

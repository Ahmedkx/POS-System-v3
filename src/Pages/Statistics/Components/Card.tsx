import Lottie from "lottie-react";

import { Badge, Flex, Paper, Text } from "@mantine/core";

interface CardProps {
    logo: unknown;
    title: string;
    number: number;
    badge?: string;
}

export default function Card({ logo, title, number, badge }: CardProps) {
    return (
        <Paper radius="lg" p="34px 17px 34px 17px">
            <Flex justify="center">
                <Lottie animationData={logo} loop={false} style={{ width: "70px" }} />

                <Flex direction="column" justify="center">
                    <Text c="#93A3AB">{title}</Text>
                    <Flex align="flex-end" gap={20}>
                        <Text style={{ fontSize: "24px" }}>{number} جنيه</Text>
                        {badge && <Badge color="green">{badge}</Badge>}
                    </Flex>
                </Flex>
            </Flex>
        </Paper>
    );
}

import Lottie from "lottie-react";

import { Badge, Flex, Text } from "@mantine/core";

interface CardProps {
    logo: unknown;
    title: string;
    number: number;
    badge?: string;
}

const classes = {
    box: {
        // minWidth: "fit-content",
        background: "white",
        padding: "34px 17px 34px 17px",
        borderRadius: "17px",
    },
};

export default function Card({ logo, title, number, badge }: CardProps) {
    return (
        <Flex style={classes.box} justify="center">
            <Lottie
                animationData={logo}
                loop={false}
                style={{ width: "70px" }}
            />

            <Flex direction="column" justify="center">
                <Text c="#93A3AB">{title}</Text>
                <Flex align="flex-end" gap={20}>
                    <Text style={{ fontSize: "24px" }}>{number} جنيه</Text>
                    {badge && <Badge color="green">{badge}</Badge>}
                </Flex>
            </Flex>
        </Flex>
    );
}

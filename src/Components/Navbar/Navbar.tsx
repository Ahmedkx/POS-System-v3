import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Container,
    Group,
    Burger,
    Box,
    Stack,
    Avatar,
    Flex,
    Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
// import ThemeButton from "../ThemeButton/ThemeButton";
import Logo from "../../Images/Logo";
import ThemeButton from "../ThemeButton/ThemeButton";

const links = [
    { link: "/", label: "الرئيسية" },
    { link: "/products", label: "الأدوية" },
    { link: "/ش", label: "تاريخ الصلاحية" },
];

export default function Navbar() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={() => {
                setActive(link.link);
            }}
        >
            {link.label}
        </Link>
    ));

    return (
        <Box component="header" className={classes.header}>
            <Container size="xl">
                <Flex justify="space-between" align="center" h="64px">
                    <Flex gap="15px">
                        <Logo width="40px" fill="white" />
                        <Group gap={5} visibleFrom="xs">
                            {items}
                        </Group>
                    </Flex>

                    {/* <ThemeButton /> */}
                    <Box>
                        <Burger
                            opened={opened}
                            onClick={toggle}
                            hiddenFrom="xs"
                            size="sm"
                            color="white"
                        />
                        <>
                            <Avatar radius="xl" color="white" />
                        </>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Group, Burger, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
// import ThemeButton from "../ThemeButton/ThemeButton";
import logo from "/logo.svg";

const links = [
    { link: "/", label: "الرئيسية" },
    { link: "/products", label: "الأدوية" },
    { link: "/learn", label: "تاريخ الصلاحية" },
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
            <Container size="xl" className={classes.inner}>
                <Box>
                    <img src={logo} width={35} height="320px" alt="logo" />
                </Box>
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                {/* <ThemeButton /> */}

                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="xs"
                    size="sm"
                    color="white"
                />
            </Container>
        </Box>
    );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Group, Burger, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./NavbarStyle.module.css";

const links = [
    { link: "/", label: "الرئيسية" },
    { link: "/login", label: "الاحصائيات" },
    { link: "/learn", label: "تاريخ الصلاحية" },
    { link: "/community", label: "Community" },
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
        <header className={classes.header}>
            <Container size="xl" className={classes.inner}>
                <Box>Logo</Box>
                <Group gap={5} visibleFrom="xs">
                    {items}
                </Group>

                <Burger
                    opened={opened}
                    onClick={toggle}
                    hiddenFrom="xs"
                    size="sm"
                />
            </Container>
        </header>
    );
}

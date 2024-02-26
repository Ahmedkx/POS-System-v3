import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    Container,
    Group,
    Burger,
    Box,
    Avatar,
    Flex,
    Menu,
    Button,
    rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
// import ThemeButton from "../ThemeButton/ThemeButton";
import Logo from "../../Images/Logo";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const links = [
    { link: "/", label: "الرئيسية" },
    { link: "/statistics", label: "الاحصائيات" },
    { link: "/products", label: "الأدوية" },
];

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(location.pathname);

    const handleKeyDown = (event) => {
        // Check if the key pressed is 'Enter'
        if (event.key === "Enter") {
            // Prevent the default action to avoid triggering the button click
            event.preventDefault();
        }
    };

    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={classes.link}
            data-active={active === link.link || undefined}
            onClick={() => {
                setActive(link.link);
            }}
            onKeyDown={handleKeyDown}
        >
            {link.label}
        </Link>
    ));

    return (
        <Box component="header" className={classes.header}>
            <Container size="xl">
                <Flex justify="space-between" align="center" h="64px">
                    <Flex gap="15px">
                        <Link
                            to="/"
                            onClick={() => {
                                setActive("");
                            }}
                        >
                            <Logo width="40px" fill="white" />
                        </Link>
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
                        <Menu>
                            <Menu.Target>
                                <Avatar
                                    style={{ cursor: "pointer" }}
                                    radius="xl"
                                    color="white"
                                />
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item
                                    leftSection={
                                        <IconSettings
                                            style={{
                                                width: rem(14),
                                                height: rem(14),
                                            }}
                                        />
                                    }
                                    onClick={() => navigate("/settings")}
                                >
                                    الاعدادات
                                </Menu.Item>
                                <Menu.Item
                                    color="red"
                                    leftSection={
                                        <IconLogout
                                            style={{
                                                width: rem(14),
                                                height: rem(14),
                                            }}
                                        />
                                    }
                                    onClick={() => navigate("/login")}
                                >
                                    تسجيل خروج
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}

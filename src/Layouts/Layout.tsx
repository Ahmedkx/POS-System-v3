import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar.js";
import { Box, Container } from "@mantine/core";

export default function Layout() {
    return (
        <>
            <Navbar />

            <Box bg="#f3f4f6">
                <Container size="xl" mih="calc(100vh - 65px)">
                    <Outlet />
                </Container>
            </Box>
        </>
    );
}

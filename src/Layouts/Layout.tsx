import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar.js";
import { Box, Container } from "@mantine/core";

export default function Layout() {
    return (
        <>
            <Navbar />

            <Box bg="#f3f4f6">
                <Container size="xl" pt={30} h="calc(100vh - 57px)">
                    <Outlet />
                </Container>
            </Box>
        </>
    );
}

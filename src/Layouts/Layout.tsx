import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar.js";
import { Container } from "@mantine/core";

export default function Layout() {
    return (
        <>
            <Navbar />

            <Container size="xl">
                <Outlet />
            </Container>
        </>
    );
}

import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider, rem } from "@mantine/core";

const theme = {
    fontFamily: "Cairo, sans-serif",
    fontSizes: {
        xs: rem(10),
        // sm: rem(11),
        sm: rem(18),
        md: rem(20),
        lg: rem(22),
        xl: rem(24),
    },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <MantineProvider theme={theme}>
        <App />
    </MantineProvider>
);

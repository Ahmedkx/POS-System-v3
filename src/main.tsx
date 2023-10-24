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
        md: rem(14),
        lg: rem(16),
        xl: rem(20),
    },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <MantineProvider theme={theme}>
        <App />
    </MantineProvider>
);

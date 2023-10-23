import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const theme = {
    fontFamily: "Cairo, sans-serif",
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <MantineProvider theme={theme}>
        <App />
    </MantineProvider>
);

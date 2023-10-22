import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import {
    MantineProvider,
    createTheme,
    MantineColorsTuple,
} from "@mantine/core";

const myColor: MantineColorsTuple = [
    "#e1f9ff",
    "#ccedff",
    "#9ad7ff",
    "#64c1ff",
    "#3baefe",
    "#20a2fe",
    "#099cff",
    "#0088e4",
    "#0078cd",
    "#0069b6",
];

const theme = createTheme({
    colors: {
        myColor,
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <MantineProvider theme={theme}>
        <App />
    </MantineProvider>
);

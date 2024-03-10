import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import { DirectionProvider, MantineProvider, rem, Loader } from "@mantine/core";
import { CustomLoader } from "./Components/CustomLoader/CustomLoader.tsx";
import { Notifications } from "@mantine/notifications";

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
    components: {
        Loader: Loader.extend({
            defaultProps: {
                loaders: { ...Loader.defaultLoaders, custom: CustomLoader },
                type: "custom",
            },
        }),
    },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <DirectionProvider>
        <MantineProvider theme={theme}>
            <Notifications />
            <App />
        </MantineProvider>
    </DirectionProvider>
);

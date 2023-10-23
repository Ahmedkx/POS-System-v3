import {
    ActionIcon,
    useMantineColorScheme,
    useComputedColorScheme,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ThemeButton() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    return (
        <ActionIcon
            onClick={() =>
                setColorScheme(
                    computedColorScheme === "light" ? "dark" : "light"
                )
            }
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
        >
            <IconSun
                style={{
                    display: computedColorScheme === "light" ? "none" : "block",
                }}
                stroke={1.5}
            />
            <IconMoon
                style={{
                    display: computedColorScheme === "light" ? "block" : "none",
                }}
                stroke={1.5}
            />
        </ActionIcon>
    );
}

import { Text } from "@mantine/core";

export default function Cell({ children }: any) {
    return (
        <Text ta="center" fw="bold" size="xl">
            {children}
        </Text>
    );
}

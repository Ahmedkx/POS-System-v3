import { Center, Text } from "@mantine/core";

export default function Cell({ children }: any) {
    return (
        <Center>
            <Text component="span" ta="center" fw="bold" size="xl">
                {children}
            </Text>
        </Center>
    );
}

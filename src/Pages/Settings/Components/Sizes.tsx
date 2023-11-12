import {
    ActionIcon,
    Flex,
    Tooltip,
    Text,
    Button,
    Loader,
    Center,
    Box,
    ScrollArea,
} from "@mantine/core";
import {
    IconBottle,
    IconBuildingFactory2,
    IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

export default function Sizes() {
    const [loading, setLoading] = useState(false);

    const distributors = [
        { id: 123, name: "موزع" },
        { id: 1233, name: "موزع" },
        { id: 14283, name: "موزع" },
        { id: 1523, name: "موزع" },
        { id: 1263, name: "موزع" },
        { id: 1723, name: "موزع" },
        { id: 0, name: "موزع" },
        { id: 13233, name: "موزع" },
        { id: 1213, name: "موزع" },
        { id: 1323, name: "موزع" },
        { id: 5, name: "موزع" },
        { id: 1253, name: "موزع" },
    ];

    return (
        <>
            <Box>
                <Text size="32px" fw="bold" ta="center">
                    أحجام العبوات
                </Text>
                <ScrollArea
                    type="always"
                    h={200}
                    my="xl"
                    py="xs"
                    px="sm"
                    w="100%"
                    bg="white"
                    style={{ borderRadius: "10px" }}
                >
                    {loading ? (
                        <Center>
                            <Loader />
                        </Center>
                    ) : (
                        <>
                            {distributors.map((distributor) => (
                                <Flex
                                    key={distributor.id}
                                    align="center"
                                    mb={10}
                                >
                                    <IconBottle />
                                    <Flex
                                        justify="space-between"
                                        align="center"
                                        w="100%"
                                    >
                                        <Text size="md" fw="bold" ta="center">
                                            {distributor.name}
                                        </Text>
                                        <Tooltip label="حذف الموزع">
                                            <ActionIcon
                                                variant="filled"
                                                color="red"
                                                aria-label="Settings"
                                            >
                                                <IconTrash
                                                    style={{
                                                        width: "70%",
                                                        height: "70%",
                                                    }}
                                                    stroke={1.5}
                                                />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Flex>
                                </Flex>
                            ))}
                        </>
                    )}
                </ScrollArea>
            </Box>
            <Button w="100%">اضافة حجم</Button>
        </>
    );
}

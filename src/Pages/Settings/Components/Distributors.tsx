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
    Modal,
    TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";

import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconTrash, IconUser } from "@tabler/icons-react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../Firebase-config";
import { useSettingsStore } from "../../../Store";

export default function Distributors() {
    const distributorsNames = useSettingsStore((state) => state.distributorsNames);

    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setmodalLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
        },

        validate: {
            name: isNotEmpty("يجب ادخال اسم الموزع"),
        },
    });

    async function handleModalSubmit(values) {
        setmodalLoading(true);
        await updateDoc(doc(db, "Settings", "distributorsNames"), {
            data: arrayUnion({
                id: Math.floor(Math.random() * 999999 * 999999),
                name: values.name,
            }),
        });
        setmodalLoading(false);
        close();
        form.reset();
    }

    async function handleDelete(distributor) {
        await updateDoc(doc(db, "Settings", "distributorsNames"), {
            data: arrayRemove(distributor),
        });
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="اضافة موزع" centered>
                <form onSubmit={form.onSubmit((values) => handleModalSubmit(values))}>
                    <TextInput
                        label="اسم الموزع"
                        placeholder="ادخل اسم الموزع"
                        withAsterisk
                        leftSection={<IconUser />}
                        {...form.getInputProps("name")}
                    />
                    <Button
                        variant="filled"
                        fullWidth
                        mt="md"
                        leftSection={<IconPlus />}
                        type="submit"
                        loading={modalLoading}
                    >
                        اضافة
                    </Button>
                </form>
            </Modal>
            <Box>
                <Text size="32px" fw="bold" ta="center">
                    أسماء الموزعين
                </Text>
                <ScrollArea
                    type="always"
                    h={200}
                    my="xl"
                    py="xs"
                    px="sm"
                    bg="white"
                    w="100%"
                    style={{ borderRadius: "10px" }}
                >
                    {loading ? (
                        <Center>
                            <Loader />
                        </Center>
                    ) : (
                        <>
                            {distributorsNames.map((distributor) => (
                                <Flex key={distributor.id} align="center" mb={10}>
                                    <IconUser />
                                    <Flex justify="space-between" align="center" w="100%">
                                        <Text size="md" fw="bold" ta="center">
                                            {distributor.name}
                                        </Text>
                                        <Tooltip
                                            label="حذف الموزع"
                                            onClick={() => handleDelete(distributor)}
                                        >
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
            <Button fullWidth onClick={open}>
                اضافة موزع
            </Button>
        </>
    );
}

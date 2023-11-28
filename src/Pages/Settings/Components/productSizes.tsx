import { useState } from "react";
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
import { IconBottle, IconPlus, IconTrash, IconUser } from "@tabler/icons-react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase-config";
import { useDisclosure } from "@mantine/hooks";
import { useSettingsStore } from "../../../Store";
import { isNotEmpty, useForm } from "@mantine/form";

export default function productSizes() {
    const productSizes = useSettingsStore((state) => state.productSizes);

    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setmodalLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
        },

        validate: {
            name: isNotEmpty("يجب ادخال حجم العبوة"),
        },
    });

    async function handleModalSubmit(values) {
        setmodalLoading(true);
        await updateDoc(doc(db, "Settings", "productSizes"), {
            data: arrayUnion({
                id: Math.floor(Math.random() * 999999 * 999999),
                name: values.name,
            }),
        });
        setmodalLoading(false);
        close();
        form.reset();
    }

    async function handleDelete(productSize) {
        await updateDoc(doc(db, "Settings", "productSizes"), {
            data: arrayRemove(productSize),
        });
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="اضافة حجم عبوة" centered>
                <form onSubmit={form.onSubmit((values) => handleModalSubmit(values))}>
                    <TextInput
                        label="حجم العبوة"
                        placeholder="ادخل حجم العبوة"
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
                            {productSizes.map((productSize) => (
                                <Flex key={productSize.id} align="center" mb={10}>
                                    <IconBottle />
                                    <Flex justify="space-between" align="center" w="100%">
                                        <Text size="md" fw="bold" ta="center">
                                            {productSize.name}
                                        </Text>
                                        <Tooltip
                                            label="حذف الموزع"
                                            onClick={() => handleDelete(productSize)}
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
                اضافة حجم
            </Button>
        </>
    );
}

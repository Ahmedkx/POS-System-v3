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
import { IconBuildingFactory2, IconPlus, IconTrash, IconUser } from "@tabler/icons-react";
import { useSettingsStore } from "../../../Store";
import { useDisclosure } from "@mantine/hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase-config";

export default function CompanyNames() {
    const companyNames = useSettingsStore((state) => state.companyNames);

    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const [modalLoading, setmodalLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
        },

        validate: {
            name: isNotEmpty("يجب ادخال اسم الشركة"),
        },
    });

    async function handleModalSubmit(values) {
        setmodalLoading(true);
        await updateDoc(doc(db, "Settings", "companyNames"), {
            data: arrayUnion({
                id: Math.floor(Math.random() * 999999 * 999999),
                name: values.name,
            }),
        });
        setmodalLoading(false);
        close();
        form.reset();
    }

    async function handleDelete(company) {
        await updateDoc(doc(db, "Settings", "companyNames"), {
            data: arrayRemove(company),
        });
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="اضافة شركة" centered>
                <form onSubmit={form.onSubmit((values) => handleModalSubmit(values))}>
                    <TextInput
                        label="اسم شركة"
                        placeholder="ادخل اسم الشركة"
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
                    أسماء الشركات
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
                            {companyNames.map((company) => (
                                <Flex key={company.id} align="center" mb={10}>
                                    <IconBuildingFactory2 />
                                    <Flex justify="space-between" align="center" w="100%">
                                        <Text size="md" fw="bold" ta="center">
                                            {company.name}
                                        </Text>
                                        <Tooltip
                                            label="حذف الموزع"
                                            onClick={() => handleDelete(company)}
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
                اضافة شركة
            </Button>
        </>
    );
}

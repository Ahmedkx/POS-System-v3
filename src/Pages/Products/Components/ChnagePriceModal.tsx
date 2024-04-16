import { useEffect } from "react";
import { Button, Modal, NumberInput } from "@mantine/core";
import {
    doc,
    increment,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useForm } from "@mantine/form";
import { IconCurrencyDollar, IconDeviceFloppy } from "@tabler/icons-react";
import useCalculateSellPrice from "../../../Hooks/useCalculateSellPrice";
import { db } from "../../../Firebase-config";

interface Props {
    opened: boolean;
    setOpened: any;
    barcode: number;
}

export default function ChangePriceModal({ opened, setOpened, id }: Props) {
    const form = useForm({
        initialValues: {
            newPrice: null,
            sellPrice: null,
        },

        validate: {
            newPrice: (value) =>
                +value < 1 ? "يجب ادخال رقم اكبر من صفر" : null,
            sellPrice: (value) =>
                +value < 1 ? "يجب ادخال رقم اكبر من صفر" : null,
        },
    });

    useEffect(() => {
        if (opened) {
            form.setValues({
                sellPrice: useCalculateSellPrice(
                    form.getInputProps("newPrice").value
                ),
            });
        }
    }, [form.getInputProps("newPrice").value]);

    async function handleSubmite(values) {
        const updateData = {
            price: +values.newPrice,
            sellPrice1: +values.sellPrice,
            lastUpdated: serverTimestamp(),
        };

        await updateDoc(doc(db, "Products", id), updateData);
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => {
                    setOpened(false);
                    form.reset();
                }}
                title="تعديل السعر"
                centered
            >
                <form
                    onSubmit={form.onSubmit((values) => {
                        handleSubmite(values);
                        setOpened(false);
                        form.reset();
                    })}
                >
                    <NumberInput
                        label="السعر الجديد"
                        placeholder="ادخل السعر الجديد"
                        allowNegative={false}
                        clampBehavior={"strict"}
                        allowLeadingZeros={true}
                        hideControls
                        my={10}
                        withAsterisk
                        max={999999}
                        leftSection={<IconCurrencyDollar />}
                        {...form.getInputProps("newPrice")}
                    />
                    <NumberInput
                        label="سعر البيع"
                        placeholder="ادخل سعر البيع"
                        allowNegative={false}
                        clampBehavior={"strict"}
                        hideControls
                        my={10}
                        withAsterisk
                        leftSection={<IconCurrencyDollar />}
                        {...form.getInputProps("sellPrice")}
                    />
                    <Button
                        variant="filled"
                        type="submit"
                        mt="lg"
                        radius="xl"
                        fullWidth
                        leftSection={<IconDeviceFloppy />}
                    >
                        حفظ
                    </Button>
                </form>
            </Modal>
        </>
    );
}

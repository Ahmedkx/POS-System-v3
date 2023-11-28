import { useEffect, useState } from "react";
import { Button, Text, NumberInput, rem } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconDeviceFloppy, IconPercentage } from "@tabler/icons-react";
import { useSettingsStore } from "../../../Store";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase-config";

export default function Profits() {
    const profit1 = useSettingsStore((state) => state.profit1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profit1) {
            form.setValues({ profit1: profit1 });
            setLoading(false);
        }
    }, [profit1]);

    const form = useForm({
        initialValues: {
            profit1: "",
        },

        validate: {
            profit1: isNotEmpty("يجب ادخال نسبة الربح"),
        },
    });

    async function handleSubmit(values: { name: string }) {
        setLoading(true);
        await updateDoc(doc(db, "Settings", "profitPercentages"), {
            percentage: +values.profit1,
        });
        setLoading(false);
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Text size="32px" fw="bold" ta="center">
                الاعدادات
            </Text>

            <NumberInput
                hideControls
                allowNegative={false}
                allowDecimal={false}
                clampBehavior="strict"
                min={1}
                max={100}
                suffix="%"
                label="نسبة الأرباح لسعر البيع"
                placeholder="ادخل نسبة الأرباح"
                leftSection={
                    <IconPercentage style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                }
                {...form.getInputProps("profit1")}
                mt="lg"
            />

            <Button
                variant="filled"
                type="submit"
                loading={loading}
                leftSection={<IconDeviceFloppy />}
                mt="lg"
                w="100%"
            >
                حفظ
            </Button>
        </form>
    );
}

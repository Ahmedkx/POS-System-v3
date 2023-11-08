import { Button, Flex, Modal, NumberInput, Select } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useEffect, useState } from "react";

interface Props {
    opened: boolean;
    setOpened: any;
    oldPrice: number;
}

export default function AddModal({ opened, setOpened, oldPrice }: Props) {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            distributorName: "",
            quantity: 0,
            newPrice: 0,
            sellPrice: 0,
        },

        validate: {
            distributorName: isNotEmpty("يجب اختيار اسم الموزع"),
            quantity: (value) => (value < 1 ? "يجب ادخال رقم اكبر من 0" : null),
            newPrice: (value) => (value < 1 ? "يجب ادخال رقم اكبر من 0" : null),
            sellPrice: (value) =>
                value < 1 ? "يجب ادخال رقم اكبر من 0" : null,
        },
    });

    useEffect(() => {
        form.setValues({
            sellPrice: +form.getInputProps("newPrice").value + 20,
        });
    }, [form.getInputProps("newPrice").value]);

    return (
        <Modal
            opened={opened}
            onClose={() => {
                setOpened(false);
                form.reset();
            }}
            title="اضافة"
            centered
        >
            <form
                onSubmit={form.onSubmit(() => {
                    form.reset();
                })}
            >
                <Select
                    label="الموزع"
                    placeholder="اختر الموزع"
                    data={["موزع", "موزع 2", "موزعع"]}
                    withAsterisk
                    {...form.getInputProps("distributorName")}
                />
                <NumberInput
                    label="العدد"
                    allowDecimal={false}
                    allowNegative={false}
                    clampBehavior={"strict"}
                    hideControls
                    min={1}
                    my={10}
                    withAsterisk
                    {...form.getInputProps("quantity")}
                />
                <NumberInput
                    label="السعر القديم"
                    allowNegative={false}
                    clampBehavior={"strict"}
                    hideControls
                    my={10}
                    disabled
                    value={oldPrice}
                />
                <NumberInput
                    label="السعر الجديد"
                    allowNegative={false}
                    clampBehavior={"strict"}
                    allowLeadingZeros={true}
                    hideControls
                    my={10}
                    withAsterisk
                    {...form.getInputProps("newPrice")}
                />
                <NumberInput
                    label="سعر البيع"
                    allowNegative={false}
                    clampBehavior={"strict"}
                    hideControls
                    my={10}
                    withAsterisk
                    {...form.getInputProps("sellPrice")}
                />
                <Flex justify="center" gap={10}>
                    <Button
                        variant="filled"
                        radius="xl"
                        type="submit"
                        loading={loading}
                    >
                        حفظ و طباعة
                    </Button>
                    <Button
                        variant="filled"
                        radius="xl"
                        type="submit"
                        loading={loading}
                    >
                        حفظ
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
}

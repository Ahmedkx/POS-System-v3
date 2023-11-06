import { Button, Flex, Modal, NumberInput, Select } from "@mantine/core";
import { isInRange, useForm } from "@mantine/form";

export default function AddModal({ opened, setOpened }) {
    const form = useForm({
        initialValues: {
            numberToPrint: 1,
        },

        validate: {
            numberToPrint: isInRange(
                { min: 1, max: 300 },
                "يجب ادخال رقم من 1 الى 300"
            ),
        },
    });

    return (
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
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
                />
                <NumberInput
                    label="العدد"
                    allowDecimal={false}
                    allowNegative={false}
                    clampBehavior={"strict"}
                    hideControls
                    min={1}
                    max={300}
                    my={10}
                    {...form.getInputProps("quantity")}
                />
                <NumberInput
                    label="السعر القديم"
                    allowNegative={false}
                    clampBehavior={"strict"}
                    hideControls
                    my={10}
                    disabled
                />
                <NumberInput
                    label="السعر الجديد"
                    allowNegative={false}
                    clampBehavior={"strict"}
                    hideControls
                    my={10}
                />
                <NumberInput
                    label="سعر البيع"
                    allowNegative={false}
                    clampBehavior={"strict"}
                    hideControls
                    my={10}
                />
                <Flex justify="center" gap={10}>
                    <Button variant="filled" radius="xl" type="submit">
                        حفظ و طباعة
                    </Button>
                    <Button variant="filled" radius="xl" type="submit">
                        حفظ
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
}

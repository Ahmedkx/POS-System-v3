import { useEffect } from "react";
import { Button, Flex, Modal, NumberInput, Select } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { Icon123, IconCurrencyDollar, IconDeviceFloppy, IconUser } from "@tabler/icons-react";
import PrintBarcodeButton from "../../../Components/PrintBarcodeButton/PrintBarcodeButton";

interface Props {
    opened: boolean;
    setOpened: any;
    product: object;
}

export default function AddModal({ opened, setOpened, product }: Props) {
    const form = useForm({
        initialValues: {
            distributorName: "",
            quantity: "",
            newPrice: "",
            sellPrice: "",
        },

        validate: {
            distributorName: isNotEmpty("يجب اختيار اسم الموزع"),
            quantity: (value) => (+value < 1 ? "يجب ادخال رقم اكبر من 0" : null),
            newPrice: (value) => (+value < 1 ? "يجب ادخال رقم اكبر من 0" : null),
            sellPrice: (value) => (+value < 1 ? "يجب ادخال رقم اكبر من 0" : null),
        },
    });

    useEffect(() => {
        form.setValues({
            sellPrice: +form.getInputProps("newPrice").value * 2,
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
                    console.log("submit");
                    setOpened(false);
                    form.reset();
                })}
            >
                <Select
                    label="الموزع"
                    placeholder="اختر الموزع"
                    data={["موزع", "موزع 2", "موزعع"]}
                    withAsterisk
                    leftSection={<IconUser />}
                    {...form.getInputProps("distributorName")}
                />
                <NumberInput
                    label="العدد"
                    placeholder="ادخل العدد"
                    allowDecimal={false}
                    allowNegative={false}
                    clampBehavior={"strict"}
                    hideControls
                    min={1}
                    my={10}
                    withAsterisk
                    leftSection={<Icon123 />}
                    {...form.getInputProps("quantity")}
                />
                <NumberInput
                    label="السعر القديم"
                    allowNegative={false}
                    clampBehavior={"strict"}
                    hideControls
                    my={10}
                    disabled
                    value={product.price}
                    leftSection={<IconCurrencyDollar />}
                />
                <NumberInput
                    label="السعر الجديد"
                    placeholder="ادخل السعر الجديد"
                    allowNegative={false}
                    clampBehavior={"strict"}
                    allowLeadingZeros={true}
                    hideControls
                    my={10}
                    withAsterisk
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
                <Flex justify="center" gap={10}>
                    {product.autoBarcode && (
                        <PrintBarcodeButton
                            barcode={product.barcode}
                            numberOfCopies={...form.getInputProps("quantity").value}
                            isValid={form.isValid()}
                        >
                            حفظ و طباعة
                        </PrintBarcodeButton>
                    )}
                    <Button
                        variant="filled"
                        radius="xl"
                        type="submit"
                        leftSection={<IconDeviceFloppy />}
                    >
                        حفظ
                    </Button>
                </Flex>
            </form>
        </Modal>
    );
}

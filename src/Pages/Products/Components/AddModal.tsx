import { SetStateAction, useEffect, useState } from "react";
import { Button, Flex, Modal, NumberInput, Select } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    Icon123,
    IconCurrencyDollar,
    IconDeviceFloppy,
    IconUser,
    IconCalendar,
} from "@tabler/icons-react";
import PrintBarcodeButton from "../../../Components/PrintBarcodeButton/PrintBarcodeButton";
import { useSettingsStore } from "../../../Store";
import {
    doc,
    increment,
    updateDoc,
    serverTimestamp,
    addDoc,
    collection,
    setDoc,
} from "firebase/firestore";
import { db } from "../../../Firebase-config";
import useCalculateSellPrice from "../../../Hooks/useCalculateSellPrice";
import { MonthPicker, MonthPickerInput } from "@mantine/dates";

interface Props {
    opened: boolean;
    setOpened: any;
    product: object;
}

export default function AddModal({ opened, setOpened, product }: Props) {
    const [timeStamp, setTimeStamp] = useState<number>(0);
    const [date, setDate] = useState<string>("");

    const handleMonthChange = (timestampString: any) => {
        const timestamp = Math.floor(timestampString.getTime() / 1000);
        setTimeStamp(timestamp);

        const date = new Date(timestampString); // Convert timestamp string to JavaScript Date object
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with zero if needed
        const year = date.getFullYear().toString().slice(-2);
        setDate(month + year);
    };

    const profit1 = useSettingsStore((state) => state.profit1);
    const distributorsNames = useSettingsStore((state) => state.distributorsNames);
    const form = useForm({
        initialValues: {
            distributorName: "",
            quantity: 0,
            newPrice: 0,
            sellPrice: 0,
        },

        validate: {
            distributorName: isNotEmpty("يجب اختيار اسم الموزع"),
            quantity: (value) => (+value < 0 ? "يجب ادخال رقم اكبر من 0" : null),
            newPrice: (value) => (+value < 1 ? "يجب ادخال رقم اكبر من 0" : null),
            sellPrice: (value) => (+value < 1 ? "يجب ادخال رقم اكبر من 0" : null),
        },
    });

    useEffect(() => {
        form.setValues({
            sellPrice: useCalculateSellPrice(form.getInputProps("newPrice").value),
        });
    }, [form.getInputProps("newPrice").value]);

    async function handleSubmit(values: any) {
        await updateDoc(doc(db, "Products", product.id), {
            quantity: increment(values.quantity),
            price: +values.newPrice,
            sellPrice1: +values.sellPrice,
            lastUpdated: serverTimestamp(),
        });

        const docRef = doc(db, "Quantities", `${product.barcode}:${date}`);
        await setDoc(
            docRef,
            {
                expiryDate: timeStamp,
                quantity: increment(values.quantity),
                name: `${product.name} ${product.size} ${product.company}`,
            },
            { merge: true }
        );
    }

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
                onSubmit={form.onSubmit((values) => {
                    handleSubmit(values);
                    setOpened(false);
                    form.reset();
                })}
            >
                <Select
                    label="الموزع"
                    placeholder="اختر الموزع"
                    data={distributorsNames.map((obj) => obj.name)}
                    withAsterisk
                    leftSection={<IconUser />}
                    searchable
                    {...form.getInputProps("distributorName")}
                />
                <NumberInput
                    label="العدد"
                    placeholder="ادخل العدد"
                    allowDecimal={false}
                    allowNegative={false}
                    clampBehavior={"strict"}
                    hideControls
                    min={0}
                    max={500}
                    my={10}
                    withAsterisk
                    leftSection={<Icon123 />}
                    {...form.getInputProps("quantity")}
                />
                <MonthPickerInput
                    leftSection={<IconCalendar />}
                    leftSectionPointerEvents="none"
                    // value={month}
                    onChange={handleMonthChange}
                    label="تاريخ انتهاء الصلاحية"
                    placeholder="اختر التاريخ"
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
                <Flex justify="center" gap={10}>
                    {product.autoBarcode && (
                        <PrintBarcodeButton
                            barcode={product.barcode}
                            numberOfCopies={form.getInputProps("quantity").value}
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

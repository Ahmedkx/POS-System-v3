import { useEffect, useState } from "react";
import {
    Button,
    Flex,
    Modal,
    NumberInput,
    Select,
    Tooltip,
    ActionIcon,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    Icon123,
    IconCurrencyDollar,
    IconDeviceFloppy,
    IconUser,
    IconCalendar,
    IconBarcode,
    IconRefresh,
} from "@tabler/icons-react";
import PrintBarcodeButton from "../../../Components/PrintBarcodeButton/PrintBarcodeButton";
import { useSettingsStore } from "../../../Store";
import {
    doc,
    increment,
    updateDoc,
    serverTimestamp,
    setDoc,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../../../Firebase-config";
import useCalculateSellPrice from "../../../Hooks/useCalculateSellPrice";
import { MonthPickerInput } from "@mantine/dates";
import useGenerateBarcode from "../../../Hooks/useGenerateBarcode";

interface Props {
    opened: boolean;
    setOpened: any;
    product: object;
}

export default function AddModal({ opened, setOpened, product }: Props) {
    const [loading, setLoading] = useState(false);
    const [barcode, generateNewBarcode, isBarcodeLoading] =
        useGenerateBarcode();
    function getMMYY(timestampString: any) {
        const date = new Date(timestampString); // Convert timestamp string to JavaScript Date object
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with zero if needed
        const year = date.getFullYear().toString().slice(-2);
        return month + year;
    }

    const distributorsNames = useSettingsStore(
        (state) => state.distributorsNames
    );

    const form = useForm({
        initialValues: {
            distributorName: "",
            quantity: 0,
            newPrice: 0,
            sellPrice: 0,
            expiarydate: null,
            barcode: +product.barcode,
        },

        validate: {
            distributorName: isNotEmpty("يجب اختيار اسم الموزع"),
            quantity: (value) =>
                +value < 0 ? "يجب ادخال رقم اكبر من 0" : null,
            newPrice: (value) =>
                +value < 1 ? "يجب ادخال رقم اكبر من 0" : null,
            sellPrice: (value) =>
                +value < 1 ? "يجب ادخال رقم اكبر من 0" : null,
            expiarydate: isNotEmpty("يجب اختيار تاريخ انتهاء الصلاحية"),
            barcode: isNotEmpty("ادخل باركود"),
        },

        transformValues: (values) => ({
            distributorName: values.distributorName,
            quantity: values.quantity,
            newPrice: values.newPrice,
            sellPrice: values.sellPrice,
            expiarydate: Math.floor(values.expiarydate?.getTime() / 1000),
        }),
    });

    useEffect(() => {
        form.setValues({
            sellPrice: useCalculateSellPrice(
                form.getInputProps("newPrice").value
            ),
        });
    }, [form.getInputProps("newPrice").value]);

    useEffect(() => {
        onSnapshot(doc(db, "Products", product.id), (doc) => {
            if (doc.data()) {
                // form.setValues(doc.data());
                setLoading(false);
            } else {
                navigate("/products");
            }
        });
    }, []);

    async function handleSubmit(values: any) {
        await updateDoc(doc(db, "Products", product.id), {
            quantity: increment(values.quantity),
            price: +values.newPrice,
            sellPrice1: +values.sellPrice,
            lastUpdated: serverTimestamp(),
        });
        const docRef = doc(
            db,
            "Quantities",
            `${form.getInputProps("barcode").value}:${getMMYY(
                form.getInputProps("expiarydate").value
            )}`
        );
        await setDoc(
            docRef,
            {
                expiryDate: form.getTransformedValues().expiarydate,
                quantity: increment(values.quantity),
                name: `${product.name} ${product.size} ${product.company}`,
                id: product.id,
            },
            { merge: true }
        );
        await updateDoc(doc(db, "Products", product.id), {
            barcode: form.getInputProps("barcode").value,
        });
    }

    const fun = () => {
        const test = +form.getInputProps("barcode").value;
        return test.length;
    };

    console.log(fun());

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
                    data={distributorsNames.map(
                        (obj: { name: string }) => obj.name
                    )}
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
                    label="تاريخ انتهاء الصلاحية"
                    placeholder="اختر التاريخ"
                    withAsterisk
                    clearable
                    valueFormat="YYYY/MM"
                    {...form.getInputProps("expiarydate")}
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
                <Flex align="flex-end" gap={5} mb="lg">
                    <NumberInput
                        label="الباركود"
                        placeholder="ادخل الباركود"
                        withAsterisk
                        allowDecimal={false}
                        allowNegative={false}
                        clampBehavior={"strict"}
                        hideControls
                        data-autofocus
                        leftSection={<IconBarcode />}
                        disabled
                        {...form.getInputProps("barcode")}
                    />
                    <Tooltip label="انشاء باركود جديد">
                        <ActionIcon
                            variant="filled"
                            size="input-sm"
                            aria-label="Settings"
                            loading={isBarcodeLoading}
                            disabled={form.getInputProps("expiarydate").value}
                            onClick={() => {
                                generateNewBarcode();
                                form.setFieldValue("barcode", barcode);
                            }}
                        >
                            <IconRefresh
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Tooltip>
                </Flex>
                <Flex justify="center" gap={10}>
                    <PrintBarcodeButton
                        barcode={`${
                            form.getInputProps("barcode").value
                        }:${getMMYY(form.getInputProps("expiarydate").value)}`}
                        numberOfCopies={form.getInputProps("quantity").value}
                        isValid={form.isValid()}
                    >
                        حفظ و طباعة
                    </PrintBarcodeButton>

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

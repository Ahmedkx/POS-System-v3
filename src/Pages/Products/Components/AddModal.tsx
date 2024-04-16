import {
    ActionIcon,
    Button,
    Flex,
    Modal,
    NumberInput,
    Select,
    Tooltip,
} from "@mantine/core";
import { DatesProvider, MonthPickerInput } from "@mantine/dates";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    Icon123,
    IconBarcode,
    IconCalendar,
    IconCurrencyDollar,
    IconDeviceFloppy,
    IconRefresh,
    IconUser,
} from "@tabler/icons-react";
import "dayjs/locale/ar";
import {
    doc,
    increment,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrintBarcodeButton from "../../../Components/PrintBarcodeButton/PrintBarcodeButton";
import { db } from "../../../Firebase-config";
import useCalculateSellPrice from "../../../Hooks/useCalculateSellPrice";
import useGenerateBarcode from "../../../Hooks/useGenerateBarcode";
import { useSettingsStore } from "../../../Store";

interface Props {
    opened: boolean;
    setOpened: any;
    product: any;
}

export default function AddModal({ opened, setOpened, product }: Props) {
    const navigate = useNavigate();
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
            newPrice: product.price,
            sellPrice: product.sellPrice1,
            expiarydate: null,
            barcode: +product.barcode,
        },

        validate: {
            // distributorName: isNotEmpty("يجب اختيار اسم الموزع"),
            quantity: (value) =>
                +value < 1 ? "يجب ادخال رقم اكبر من صفر" : null,
            newPrice: (value) =>
                +value < 1 ? "يجب ادخال رقم اكبر من صفر" : null,
            sellPrice: (value) =>
                +value < 1 ? "يجب ادخال رقم اكبر من صفر" : null,
            expiarydate:
                product.saveExpiryDates &&
                isNotEmpty("يجب اختيار تاريخ انتهاء الصلاحية"),
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
        if (opened) {
            form.setValues({
                sellPrice: useCalculateSellPrice(
                    form.getInputProps("newPrice").value
                ),
            });
        }
    }, [form.getInputProps("newPrice").value]);

    async function handleSubmit(values: any) {
        const updateData = {
            quantity: increment(values.quantity),
            price: +values.newPrice,
            sellPrice1: +values.sellPrice,
        };
        if (
            product.price != form.getInputProps("newPrice").value ||
            product.sellPrice1 != form.getInputProps("sellPrice").value
        ) {
            updateData.lastUpdated = serverTimestamp();
        }
        await updateDoc(doc(db, "Products", product.id), updateData);

        if (product.saveExpiryDates) {
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
        }

        await updateDoc(doc(db, "Products", product.id), {
            barcode: form.getInputProps("barcode").value,
        });
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
                    // form.reset();
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
                {product.saveExpiryDates && (
                    <DatesProvider
                        settings={{
                            locale: "ar",
                        }}
                    >
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
                    </DatesProvider>
                )}

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
                            disabled={
                                form.getInputProps("barcode").value.toString()
                                    .length == 4
                            }
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

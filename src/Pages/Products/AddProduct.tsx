import {
    ActionIcon,
    Button,
    Center,
    Checkbox,
    Flex,
    NumberInput,
    Select,
    Text,
    TextInput,
    Tooltip,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    IconAbc,
    IconBarcode,
    IconBottle,
    IconBuildingFactory2,
    IconRefresh,
} from "@tabler/icons-react";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../Firebase-config";
import useGenerateBarcode from "../../Hooks/useGenerateBarcode";
import { useSettingsStore } from "../../Store";

interface FormValues {
    name: string;
    companyName: string;
    size: string;
    barcode: number | null;
    saveExpiryDates: boolean;
}

export default function AddProduct() {
    const [barcode, generateNewBarcode, isBarcodeLoading] =
        useGenerateBarcode();
    const companyNames = useSettingsStore((state: any) => state.companyNames);
    const productSizes = useSettingsStore((state: any) => state.productSizes);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        initialValues: {
            name: "",
            companyName: "",
            size: "",
            barcode: null,
            saveExpiryDates: true,
        },

        validate: {
            name: isNotEmpty("يجب ادخال اسم المنتج"),
            companyName: isNotEmpty("يجب اخيار اسم الشركة"),
            size: isNotEmpty("يجب اخيار حجم العبوة"),
            barcode: isNotEmpty("يجب ادخال الباركود"),
        },
    });

    const handleSubmit = async (values: any) => {
        setLoading(true);
        await addDoc(collection(db, "Products"), {
            name: values.name,
            company: values.companyName,
            price: 0,
            sellPrice1: 0,
            quantity: 0,
            size: values.size,
            barcode: +values.barcode,
            saveExpiryDates: values.saveExpiryDates,
        });
        setLoading(false);
        navigate("/products");
    };

    return (
        <Center>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Flex pt={30} direction={"column"} gap={20} w="250px">
                    <Text size="32px" fw="bold" ta="center">
                        اضافة منتج
                    </Text>
                    <TextInput
                        label="الاسم"
                        placeholder="ادخل اسم المنتج"
                        withAsterisk
                        leftSection={<IconAbc />}
                        {...form.getInputProps("name")}
                    />
                    <Select
                        label="اسم الشركة"
                        placeholder="اختر اسم الشركة"
                        withAsterisk
                        data={companyNames.map((obj: any) => obj.name)}
                        leftSection={<IconBuildingFactory2 />}
                        searchable
                        {...form.getInputProps("companyName")}
                    />
                    <Select
                        label="العبوة"
                        placeholder="اختيار حجم العبوة"
                        withAsterisk
                        data={productSizes.map((obj: any) => obj.name)}
                        leftSection={<IconBottle />}
                        searchable
                        {...form.getInputProps("size")}
                    />
                    <Checkbox
                        label="حفظ تاريخ الصلاحية"
                        {...form.getInputProps("saveExpiryDates", {
                            type: "checkbox",
                        })}
                    />
                    <Flex align="flex-end" gap={5}>
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
                            disabled={isBarcodeLoading}
                            {...form.getInputProps("barcode")}
                        />
                        <Tooltip label="انشاء باركود جديد">
                            <ActionIcon
                                variant="filled"
                                size="input-sm"
                                aria-label="Settings"
                                loading={isBarcodeLoading}
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
                    <Button variant="filled" type="submit" loading={loading}>
                        اضافة
                    </Button>
                </Flex>
            </form>
        </Center>
    );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Select,
    Button,
    Center,
    Checkbox,
    Flex,
    Text,
    TextInput,
    NumberInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    Icon123,
    IconAbc,
    IconBarcode,
    IconBottle,
    IconBuildingFactory2,
} from "@tabler/icons-react";
import { db } from "../../Firebase-config";
import { addDoc, collection } from "firebase/firestore";
import { useSettingsStore } from "../../Store";

interface FormValues {
    name: string;
    companyName: string;
    size: string;
    lowStock: number;
    autoBarcode: boolean;
    barcode: number | null;
}

export default function AddProduct() {
    const companyNames = useSettingsStore((state: any) => state.companyNames);
    const productSizes = useSettingsStore((state: any) => state.productSizes);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        initialValues: {
            name: "",
            companyName: "",
            size: "",
            lowStock: 0,
            autoBarcode: false,
            barcode: null,
        },

        validate: {
            name: isNotEmpty("يجب ادخال اسم المنتج"),
            companyName: isNotEmpty("يجب اخيار اسم الشركة"),
            size: isNotEmpty("يجب اخيار حجم العبوة"),
            lowStock: isNotEmpty("يجب ادخال كمية النواقص"),
            barcode: isNotEmpty("يجب ادخال الباركود"),
        },
    });

    useEffect(() => {
        if (form.getInputProps("autoBarcode").value) {
            form.setValues({
                barcode: Math.floor(10000000 + Math.random() * 90000000),
            });
        } else {
            form.setValues({
                barcode: null,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.getInputProps("autoBarcode").value]);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        await addDoc(collection(db, "Products"), {
            name: values.name,
            company: values.companyName,
            price: 0,
            sellPrice1: 0,
            quantity: 0,
            size: values.size,
            autoBarcode: values.autoBarcode,
            barcode: +values.barcode,
            lowStock: +values.lowStock,
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
                    {/* <NumberInput
                        label="الاسم"
                        placeholder="ادخل اسم المنتج"
                        withAsterisk
                        leftSection={<IconAbc />}
                        {...form.getInputProps("name")}
                    /> */}
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
                    <NumberInput
                        label="النواقص"
                        placeholder="ادخل كمية النواقص"
                        withAsterisk
                        hideControls
                        allowNegative={false}
                        allowDecimal={false}
                        leftSection={<Icon123 />}
                        {...form.getInputProps("lowStock")}
                    />
                    <Checkbox
                        label="باركود تلقائى"
                        {...form.getInputProps("autoBarcode", {
                            type: "checkbox",
                        })}
                    />
                    <NumberInput
                        label="الباركود"
                        placeholder="ادخل الباركود"
                        withAsterisk
                        allowDecimal={false}
                        allowNegative={false}
                        clampBehavior={"strict"}
                        hideControls
                        data-autofocus
                        disabled={form.getInputProps("autoBarcode").value}
                        leftSection={<IconBarcode />}
                        {...form.getInputProps("barcode")}
                    />
                    <Button variant="filled" type="submit" loading={loading}>
                        اضافة
                    </Button>
                </Flex>
            </form>
        </Center>
    );
}

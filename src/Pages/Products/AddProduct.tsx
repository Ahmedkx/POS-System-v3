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
import { useEffect, useState } from "react";

const data = ["ارابكو", "فارما", "فايزر"];

export default function AddProduct() {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
            companyName: "",
            size: "",
            lowStock: "",
            autoBarcode: false,
            barcode: "",
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
                barcode: Math.floor(
                    10000000 + Math.random() * 90000000
                ).toString(),
            });
        } else {
            form.setValues({
                barcode: "",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.getInputProps("autoBarcode").value]);

    const handleSubmit = (values: {
        name: string;
        companyName: string;
        size: string;
        lowStock: string;
        autoBarcode: boolean;
        barcode: string;
    }) => {
        console.log(values);
        setLoading(true);
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
                        {...form.getInputProps("name")}
                    />
                    <Select
                        label="اسم الشركة"
                        placeholder="اختر اسم الشركة"
                        data={data}
                        {...form.getInputProps("companyName")}
                    />
                    <Select
                        label="العبوة"
                        placeholder="اختيار حجم العبوة"
                        data={data}
                        {...form.getInputProps("size")}
                    />
                    <NumberInput
                        hideControls
                        allowNegative={false}
                        allowDecimal={false}
                        label="النواقص"
                        placeholder="ادخل كمية النواقص"
                        {...form.getInputProps("lowStock")}
                    />
                    <Checkbox
                        label="باركود تلقائى"
                        {...form.getInputProps("autoBarcode", {
                            type: "checkbox",
                        })}
                    />
                    <TextInput
                        label="الباركود"
                        placeholder="ادخل الباركود"
                        disabled={...form.getInputProps("autoBarcode").value}
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

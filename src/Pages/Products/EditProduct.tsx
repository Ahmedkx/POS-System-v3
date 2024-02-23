import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
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
    IconDeviceFloppy,
    IconTrash,
} from "@tabler/icons-react";
import { db } from "../../Firebase-config";
import { useSettingsStore } from "../../Store";
import useCalculateSellPrice from "../../Hooks/useCalculateSellPrice";

export default function EditProduct() {
    const profit1 = useSettingsStore((state: any) => state.profit1);
    const companyNames = useSettingsStore((state: any) => state.companyNames);
    const productSizes = useSettingsStore((state: any) => state.productSizes);
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const form = useForm({
        initialValues: {
            name: "",
            company: "",
            size: "",
            lowStock: "",
            autoBarcode: false,
            barcode: 0,
            price: 0,
            sellPrice1: 0,
            quantity: 0,
        },

        validate: {
            name: isNotEmpty("يجب ادخال اسم المنتج"),
            company: isNotEmpty("يجب اخيار اسم الشركة"),
            size: isNotEmpty("يجب اخيار حجم العبوة"),
            lowStock: isNotEmpty("يجب ادخال كمية النواقص"),
            barcode: isNotEmpty("يجب ادخال الباركود"),
            price: isNotEmpty("يجب ادخال السعر"),
            sellPrice1: isNotEmpty("يجب ادخال سعر البيع"),
            quantity: isNotEmpty("يجب ادخال الكمية"),
        },
    });

    useEffect(() => {
        if (form.getInputProps("autoBarcode").value && !form.getInputProps("barcode").value) {
            form.setValues({
                barcode: Math.floor(10000000 + Math.random() * 90000000),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.getInputProps("autoBarcode").value]);

    useEffect(() => {
        onSnapshot(doc(db, "Products", params.id), (doc) => {
            if (doc.data()) {
                form.setValues(doc.data());
                setLoading(false);
            } else {
                navigate("/products");
            }
        });
    }, []);

    useEffect(() => {
        form.setValues({
            sellPrice1: useCalculateSellPrice(form.getInputProps("price").value),
        });
    }, [form.getInputProps("price").value]);

    const handleSubmit = (values: any) => {
        updateDoc(doc(db, "Products", params.id), {
            name: values.name,
            company: values.company,
            size: values.size,
            lowStock: +values.lowStock,
            autoBarcode: values.autoBarcode,
            barcode: +values.barcode,
            price: +values.price,
            sellPrice1: +values.sellPrice1,
            quantity: +values.quantity,
        });
        setLoading(true);
        navigate("/products");
    };

    async function handleDelete() {
        setLoading(true);
        await deleteDoc(doc(db, "Products", params.id));
        navigate("/products");
    }

    return (
        <Center>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Flex pt={30} direction={"column"} gap={20} w="250px">
                    <Text size="32px" fw="bold" ta="center">
                        تعديل منتج
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
                        data={companyNames.map((obj: { name: any }) => obj.name)}
                        leftSection={<IconBuildingFactory2 />}
                        searchable
                        {...form.getInputProps("company")}
                    />
                    <Select
                        label="العبوة"
                        placeholder="اختيار حجم العبوة"
                        withAsterisk
                        data={productSizes.map((obj: { name: any }) => obj.name)}
                        leftSection={<IconBottle />}
                        searchable
                        {...form.getInputProps("size")}
                    />
                    <NumberInput
                        label="السعر"
                        placeholder="ادخل السعر"
                        withAsterisk
                        hideControls
                        allowNegative={false}
                        leftSection={<Icon123 />}
                        max={1}
                        {...form.getInputProps("price")}
                    />
                    <NumberInput
                        label="سعر البيع"
                        placeholder="ادخل سعر البيع"
                        withAsterisk
                        hideControls
                        allowNegative={false}
                        leftSection={<Icon123 />}
                        {...form.getInputProps("sellPrice1")}
                    />
                    <NumberInput
                        label="الكمية"
                        placeholder="ادخل الكمية"
                        withAsterisk
                        hideControls
                        allowNegative={false}
                        leftSection={<Icon123 />}
                        {...form.getInputProps("quantity")}
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
                    <Button
                        variant="filled"
                        type="submit"
                        loading={loading}
                        leftSection={<IconDeviceFloppy />}
                    >
                        حفظ
                    </Button>
                    <Button
                        variant="filled"
                        color="red"
                        loading={loading}
                        leftSection={<IconTrash />}
                        onClick={handleDelete}
                    >
                        حذف المنتج
                    </Button>
                </Flex>
            </form>
        </Center>
    );
}

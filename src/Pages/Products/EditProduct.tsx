import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
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

const data = ["ارابكو", "فارما", "فايزر"];

export default function EditProduct() {
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
            barcode: "",
        },

        validate: {
            name: isNotEmpty("يجب ادخال اسم المنتج"),
            company: isNotEmpty("يجب اخيار اسم الشركة"),
            size: isNotEmpty("يجب اخيار حجم العبوة"),
            lowStock: isNotEmpty("يجب ادخال كمية النواقص"),
            barcode: isNotEmpty("يجب ادخال الباركود"),
        },
    });

    useEffect(() => {
        if (form.getInputProps("autoBarcode").value && !form.getInputProps("barcode").value) {
            form.setValues({
                barcode: Math.floor(10000000 + Math.random() * 90000000).toString(),
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.getInputProps("autoBarcode").value]);

    const handleSubmit = (values: {
        name: string;
        company: string;
        size: string;
        lowStock: string;
        autoBarcode: boolean;
        barcode: string;
    }) => {
        console.log(values);
        setLoading(true);
    };

    useEffect(() => {
        const getData = onSnapshot(doc(db, "Products", params.id), (doc) => {
            if (doc.data()) {
                form.setValues(doc.data());
                setLoading(false);
            } else {
                navigate("/products");
            }
        });
    }, []);

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
                        data={data}
                        leftSection={<IconBuildingFactory2 />}
                        {...form.getInputProps("company")}
                    />
                    <Select
                        label="العبوة"
                        placeholder="اختيار حجم العبوة"
                        withAsterisk
                        data={data}
                        leftSection={<IconBottle />}
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

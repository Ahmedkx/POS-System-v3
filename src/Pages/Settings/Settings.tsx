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
import { useState } from "react";

export default function Settings() {
    const [loading, setLoading] = useState(false);

    const form = useForm({
        initialValues: {
            name: "",
        },

        validate: {
            name: isNotEmpty("يجب ادخال اسم المنتج"),
        },
    });

    const handleSubmit = (values: { name: string }) => {
        console.log(values);
        // setLoading(true);
    };

    return (
        <Center>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Flex pt={30} direction={"column"} gap={20} w="250px">
                    <Text size="32px" fw="bold" ta="center">
                        الاعدادات
                    </Text>

                    <NumberInput
                        hideControls
                        allowNegative={false}
                        allowDecimal={false}
                        clampBehavior="strict"
                        min={1}
                        max={100}
                        suffix="%"
                        label="نسبة الأرباح لسعر البيع"
                        placeholder="ادخل نسبة الأرباح"
                        {...form.getInputProps("name")}
                    />

                    <Button variant="filled" type="submit" loading={loading}>
                        حفظ
                    </Button>
                </Flex>
            </form>
        </Center>
    );
}

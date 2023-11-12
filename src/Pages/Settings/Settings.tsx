import {
    Button,
    Center,
    Flex,
    Text,
    NumberInput,
    rem,
    Space,
    Divider,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { IconDeviceFloppy, IconPercentage } from "@tabler/icons-react";
import { useState } from "react";
import Distributors from "./Components/Distributors";
import CompanyNames from "./Components/CompanyNames";
import Sizes from "./Components/Sizes";

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
        setLoading(true);
    };

    return (
        <>
            <Space h="lg" />
            <Center>
                <Flex direction={"column"} w="250px">
                    <form
                        onSubmit={form.onSubmit((values) =>
                            handleSubmit(values)
                        )}
                    >
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
                            leftSection={
                                <IconPercentage
                                    style={{ width: rem(16), height: rem(16) }}
                                    stroke={1.5}
                                />
                            }
                            {...form.getInputProps("name")}
                            mt="lg"
                        />

                        <Button
                            variant="filled"
                            type="submit"
                            loading={loading}
                            leftSection={<IconDeviceFloppy />}
                            mt="lg"
                            w="100%"
                        >
                            حفظ
                        </Button>
                    </form>
                    <Divider my="sm" variant="dashed" color="black" />
                    <Distributors />
                    <Divider my="xl" variant="dashed" color="black" />
                    <CompanyNames />
                    <Divider my="xl" variant="dashed" color="black" />
                    <Sizes />
                </Flex>
            </Center>
        </>
    );
}

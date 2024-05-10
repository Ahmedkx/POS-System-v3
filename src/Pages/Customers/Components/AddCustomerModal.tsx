import { Button, Modal, TextInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import {
    IconAbc,
    IconDeviceFloppy,
    IconDeviceLandlinePhone,
    IconPhone,
} from "@tabler/icons-react";

export default function AddCustomerModal({ opened, close }) {
    const form = useForm({
        initialValues: {
            name: "",
            phone: "",
            landline: "",
        },

        validate: {
            name: isNotEmpty("يجب ادخال اسم العميل"),
            phone: isNotEmpty("يجب ادخال رقم الحمول"),
            landline: isNotEmpty("ادخل رقم التلفون الأرضى"),
        },
    });

    return (
        <Modal opened={opened} onClose={close} title="اضافة عميل" centered>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput
                    {...form.getInputProps("name")}
                    withAsterisk
                    label="الاسم"
                    placeholder="ادخل اسم العميل"
                    leftSection={<IconAbc />}
                />
                <TextInput
                    {...form.getInputProps("phone")}
                    withAsterisk
                    label="رقم المحمول"
                    placeholder="ادخل رقم المحمول"
                    leftSection={<IconPhone />}
                />
                <TextInput
                    {...form.getInputProps("landline")}
                    withAsterisk
                    label="رقم التلفون الأرضى"
                    placeholder="ادخل رقم التلفون الأرضى"
                    leftSection={<IconDeviceLandlinePhone />}
                />

                <Button
                    type="submit"
                    mt="md"
                    fullWidth
                    leftSection={<IconDeviceFloppy />}
                >
                    حفظ
                </Button>
            </form>
        </Modal>
    );
}

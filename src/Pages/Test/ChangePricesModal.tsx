import { Button, Modal, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAbc, IconDeviceFloppy } from "@tabler/icons-react";

export default function ChangePricesModal({ opened, close }) {
    const initialValues = {
        أبيض: "",
        بلدى: "",
        ساسو: "",
        فيومى: "",
        ديوك: "",
        مسكوفى: "",
        مولر: "",
        سمان: "",
    };

    const namesArray = Object.keys(initialValues);

    const form = useForm({
        initialValues: initialValues,
    });

    return (
        <Modal opened={opened} onClose={close} title="تغيير الأسعار" centered>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                {namesArray.map((name, i) => (
                    <NumberInput
                        {...form.getInputProps("أبيض")}
                        key={i}
                        withAsterisk
                        label={`سعر ${name}`}
                        placeholder="ادخل سعر الأبيض"
                        leftSection={<IconAbc />}
                        hideControls
                    />
                ))}

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

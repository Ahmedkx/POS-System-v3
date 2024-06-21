import { Button, Modal, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAbc, IconDeviceFloppy } from "@tabler/icons-react";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../../Firebase-config";

export default function ChangePricesModal({ opened, close }) {
    const initialValues = {
        أبيض: "",
        بلدى: "",
        ساسو: "",
        فيومى: "",
        ديوك: "",
        "جيل تانى": "",
        مولر: "",
        مسكوفى: "",
        فرنساوى: "",
        سمان: "",
        رومى: "",
    };

    const namesArray = Object.keys(initialValues);

    const form = useForm({
        initialValues: initialValues,
    });

    const updateFirestoreDocument = async (values) => {
        try {
            const docRef = doc(db, "test", "prices");
            await setDoc(docRef, values);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    useEffect(() => {
        if (!opened) {
            form.reset();
        }
    }, [opened]);

    return (
        <Modal opened={opened} onClose={close} title="تغيير الأسعار" centered>
            <form
                onSubmit={form.onSubmit((values) => {
                    updateFirestoreDocument(values);
                    form.reset();
                    close();
                })}
            >
                {namesArray.map((name, i) => (
                    <NumberInput
                        {...form.getInputProps(name)}
                        key={i}
                        label={`سعر ${name}`}
                        placeholder={`ادخل سعر ${name}`}
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

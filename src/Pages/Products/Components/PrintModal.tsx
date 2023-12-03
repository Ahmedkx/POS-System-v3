import { Center, Modal, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Barcode from "react-jsbarcode";
import { Icon123 } from "@tabler/icons-react";
import PrintBarcodeButton from "../../../Components/PrintBarcodeButton/PrintBarcodeButton";

interface Props {
    opened: boolean;
    setOpened: any;
    barcode: number;
}

export default function PrintModal({ opened, setOpened, barcode }: Props) {
    const form = useForm({
        initialValues: {
            numberToPrint: "",
        },

        validate: {
            numberToPrint: (value) => (+value < 1 ? "يجب ادخال رقم اكبر من 0" : null),
        },
    });

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => {
                    setOpened(false);
                    form.reset();
                }}
                title="طباعة الباركود"
                centered
            >
                <Center>
                    <Barcode value={barcode.toString()} />
                </Center>
                <form
                    onSubmit={form.onSubmit(() => {
                        setOpened(false);
                        form.reset();
                    })}
                >
                    <NumberInput
                        label="العدد"
                        placeholder="ادخل العدد"
                        withAsterisk
                        allowDecimal={false}
                        allowNegative={false}
                        clampBehavior={"strict"}
                        hideControls
                        data-autofocus
                        min={1}
                        max={300}
                        my={10}
                        leftSection={<Icon123 />}
                        {...form.getInputProps("numberToPrint")}
                    />
                    <PrintBarcodeButton
                        barcode={barcode}
                        numberOfCopies={form.getInputProps("numberToPrint").value}
                        isValid={form.isValid()}
                    >
                        طباعة
                    </PrintBarcodeButton>
                </form>
            </Modal>
        </>
    );
}

import { useRef } from "react";
import { Box, Button, Center, Modal, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-jsbarcode";

interface Props {
    opened: boolean;
    setOpened: any;
    barcode: number;
}

export default function PrintModal({ opened, setOpened, barcode }: Props) {
    const barcodeRef = useRef<HTMLInputElement>(null);
    const handlePrint = useReactToPrint({
        content: () => barcodeRef.current,
    });

    const form = useForm({
        initialValues: {
            numberToPrint: 0,
        },

        validate: {
            numberToPrint: (value) =>
                value < 1 ? "يجب ادخال رقم اكبر من 0" : null,
        },
    });

    return (
        <>
            <Box
                ref={barcodeRef}
                style={{ position: "fixed", zIndex: "-9999" }}
            >
                {opened &&
                    Array.from(
                        { length: form.getInputProps("numberToPrint").value },
                        (_, i) => <Barcode key={i} value={barcode.toString()} />
                    )}
            </Box>

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
                        handlePrint();
                        form.reset();
                    })}
                >
                    <NumberInput
                        label="العدد"
                        placeholder="ادخل العدد"
                        allowDecimal={false}
                        allowNegative={false}
                        clampBehavior={"strict"}
                        hideControls
                        data-autofocus
                        min={1}
                        max={300}
                        my={10}
                        {...form.getInputProps("numberToPrint")}
                    />
                    <Button variant="filled" radius="xl" w="100%" type="submit">
                        طباعة
                    </Button>
                </form>
            </Modal>
        </>
    );
}

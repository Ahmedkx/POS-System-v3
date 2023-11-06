import { useRef } from "react";
import { Box, Button, Center, Modal, NumberInput } from "@mantine/core";
import { isInRange, useForm } from "@mantine/form";
import { useReactToPrint } from "react-to-print";
import Barcode from "react-jsbarcode";

interface Props {}

export default function PrintModal({ opened, setOpened }) {
    const barcodeRef = useRef<HTMLInputElement>(null);
    const handlePrint = useReactToPrint({
        content: () => barcodeRef.current,
    });

    const form = useForm({
        initialValues: {
            distributorName: "",
            quantity: 0,
            newPrice: 0,
            sellPrice: 0,
        },

        validate: {
            numberToPrint: isInRange({ min: 0 }, "يجب ادخال رقم اكبر من 0"),
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
                        (_, i) => <Barcode key={i} value="ABC123" />
                    )}
            </Box>

            <Modal
                opened={opened}
                onClose={() => {
                    setOpened(false);
                }}
                title="طباعة الباركود"
                centered
            >
                <Center>
                    <Barcode value="ABC123" />
                </Center>
                <form
                    onSubmit={form.onSubmit(() => {
                        setOpened(false);
                        handlePrint();
                    })}
                >
                    <NumberInput
                        label="العدد"
                        // placeholder="العدد"
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

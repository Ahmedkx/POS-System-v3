import { Center, Modal, NumberInput } from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import Barcode from "react-jsbarcode";
import { Icon123, IconCalendar } from "@tabler/icons-react";
import PrintBarcodeButton from "../../../Components/PrintBarcodeButton/PrintBarcodeButton";
import { MonthPickerInput } from "@mantine/dates";

interface Props {
    opened: boolean;
    setOpened: any;
    barcode: number;
}

export default function PrintModal({ opened, setOpened, barcode }: Props) {
    function getMMYY(timestampString: any) {
        const date = new Date(timestampString); // Convert timestamp string to JavaScript Date object
        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month and pad with zero if needed
        const year = date.getFullYear().toString().slice(-2);
        return month + year;
    }

    const form = useForm({
        initialValues: {
            numberToPrint: "",
            expiarydate: null,
        },

        validate: {
            numberToPrint: (value) =>
                +value < 1 ? "يجب ادخال رقم اكبر من 0" : null,
            expiarydate: isNotEmpty("يجب اختيار تاريخ انتهاء الصلاحية"),
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
                    <Barcode
                        value={`${barcode}:${getMMYY(
                            form.getInputProps("expiarydate").value
                        )}`}
                    />
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
                    <MonthPickerInput
                        leftSection={<IconCalendar />}
                        leftSectionPointerEvents="none"
                        label="تاريخ انتهاء الصلاحية"
                        placeholder="اختر التاريخ"
                        withAsterisk
                        my="sm"
                        clearable
                        valueFormat="YYYY/MM"
                        {...form.getInputProps("expiarydate")}
                    />
                    <PrintBarcodeButton
                        barcode={`${barcode}:${getMMYY(
                            form.getInputProps("expiarydate").value
                        )}`}
                        numberOfCopies={
                            form.getInputProps("numberToPrint").value
                        }
                        isValid={form.isValid()}
                    >
                        طباعة
                    </PrintBarcodeButton>
                </form>
            </Modal>
        </>
    );
}

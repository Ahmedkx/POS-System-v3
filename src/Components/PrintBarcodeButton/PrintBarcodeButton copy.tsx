import { Box, Button } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import { useRef } from "react";
import Barcode from "react-jsbarcode";
import { useReactToPrint } from "react-to-print";

interface Props {
    barcode: number;
    numberOfCopies: number;
    isValid: boolean;
    children: React.ReactNode;
}

export default function PrintBarcodeButton({
    barcode,
    numberOfCopies,
    isValid,
    children,
}: Props) {
    const barcodeRef = useRef<HTMLInputElement>(null);
    const handlePrint = useReactToPrint({
        content: () => barcodeRef.current,
    });

    return (
        <>
            <div style={{ display: "none" }}>
                <div ref={barcodeRef}>
                    {Array.from(
                        { length: Math.ceil(numberOfCopies / 2) },
                        (_, i) => (
                            <Barcode
                                key={i}
                                value={barcode.toString()}
                                options={{ height: 110 }}
                            />
                        )
                    )}
                </div>
            </div>
            <Box>
                <Button
                    variant="filled"
                    radius="xl"
                    w="100%"
                    type="submit"
                    leftSection={<IconPrinter />}
                    onClick={() => isValid && handlePrint()}
                >
                    {children}
                </Button>
            </Box>
        </>
    );
}

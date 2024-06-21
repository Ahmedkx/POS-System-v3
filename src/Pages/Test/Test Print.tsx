import { Flex, Text } from "@mantine/core";
import { useRef } from "react";
import Barcode from "react-jsbarcode";

const Test = () => {
    const componentRef = useRef();

    const handlePrintClick = () => {
        const printContents = componentRef.current.innerHTML;
        const printWindow = window.open("", "", "width=800,height=600");
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print</title>
                </head>
                <body>
                    ${printContents}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    return (
        <div>
            <h1>Test</h1>
            <div ref={componentRef}>
                <Flex
                    id="elementToPrint"
                    direction="column"
                    justify="space-between"
                    align="center"
                    w="144px"
                    h="94px"
                >
                    <Flex direction="column">
                        <Barcode
                            value={`1324:0120`}
                            options={{
                                height: 36,
                                width: 1.25,
                                margin: 0,
                                displayValue: false,
                            }}
                        />
                        <Text ta="center" m={0} size="8px">
                            اوكسى توسن دايانا ادويا سل - 1324:0120
                        </Text>
                    </Flex>
                    <Flex direction="column">
                        <Barcode
                            value={`1324:0120`}
                            options={{
                                height: 36,
                                width: 1.25,
                                margin: 0,
                                displayValue: false,
                            }}
                        />
                        <Text ta="center" m={0} size="8px">
                            1324:0120
                        </Text>
                    </Flex>
                </Flex>
            </div>
            <button onClick={handlePrintClick} style={{ marginTop: "50px" }}>
                Print
            </button>
        </div>
    );
};

export default Test;

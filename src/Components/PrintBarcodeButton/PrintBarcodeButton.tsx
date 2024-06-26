import { Box, Button, Flex, Text } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";
import * as htmlToImage from "html-to-image";
import Barcode from "react-jsbarcode";

interface Props {
    barcode: number;
    numberOfCopies: number;
    isFullSize: boolean;
    isValid: boolean;
    children: React.ReactNode;
}

export default function PrintBarcodeButton({
    barcode,
    numberOfCopies,
    isFullSize,
    isValid,
    children,
}: Props) {
    const handlePrint = () => {
        const element = document.getElementById("elementToPrint");
        htmlToImage
            .toSvg(element, { width: 144, height: 95 })
            .then(function (dataUrl) {
                const newTab: Window = window.open("", "_blank");
                let copies = isFullSize
                    ? numberOfCopies
                    : Math.ceil(numberOfCopies / 2);
                let imagesHtml = "";
                for (let i = 0; i < copies; i++) {
                    imagesHtml += `<img src="${dataUrl}" />`;
                }
                newTab.document.write(`
                    <html>
                        <head>
                            <title>طباعة الباركود</title>
                            <style>
                                body {
                                    margin: 0;
                                    padding: 0;
                                }
                            </style>
                        </head>
                        <body>
                            ${imagesHtml}
                        </body>
                    </html>
                `);
                newTab.document.close();
                newTab.focus();
                const img = new Image();
                img.src = dataUrl;
                img.onload = function () {
                    newTab.print();
                    newTab.close();
                };
            })
            .catch(function (error) {
                console.error("Error generating image: ", error);
            });
    };

    return (
        <>
            <Flex
                id="elementToPrint"
                direction="column"
                // justify="space-between"
                // align="center"
                w="144px"
                h="94px"
            >
                {[...Array(2)].map((_, index) => (
                    <Flex key={index} direction="column">
                        <Barcode
                            value={barcode.toString()}
                            options={{
                                // height: 38,
                                height: 35,
                                width: 1.25,
                                margin: 0,
                                displayValue: false,
                            }}
                        />
                        <Text ta="center" m={0} size="12px">
                            {barcode.toString()}
                        </Text>
                    </Flex>
                ))}
            </Flex>
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

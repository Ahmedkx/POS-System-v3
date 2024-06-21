import { Flex, Text } from "@mantine/core";
import * as htmlToImage from "html-to-image";
import Barcode from "react-jsbarcode";

const Test = () => {
    const handlePrintClick = () => {
        const element = document.getElementById("elementToPrint");
        htmlToImage
            .toSvg(element, { width: 144, height: 95 })
            .then(function (dataUrl) {
                const newTab: Window = window.open("", "_blank");
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
                            <img src="${dataUrl}" />
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
                            value="3957:0527"
                            options={{
                                // height: 38,
                                height: 35,
                                width: 1.25,
                                margin: 0,
                                displayValue: false,
                            }}
                        />
                        <Text ta="center" m={0} size="12px">
                            3957:0527
                        </Text>
                    </Flex>
                ))}
            </Flex>
            <button onClick={handlePrintClick} style={{ marginTop: "50px" }}>
                Print
            </button>
        </>
    );
};

export default Test;

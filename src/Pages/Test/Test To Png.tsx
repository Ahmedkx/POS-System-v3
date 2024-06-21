import { Flex, Text } from "@mantine/core";
import * as htmlToImage from "html-to-image";
import Barcode from "react-jsbarcode";

const Test = () => {
    const handlePrintClick = () => {
        const element = document.getElementById("elementToPrint");

        htmlToImage
            .toPng(element, { width: 144, height: 94, quality: 1 })
            .then(function (dataUrl) {
                const newTab = window.open("", "_blank");
                const img = new Image();
                img.src = dataUrl;
                newTab.document.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
                body {
                  margin: 0;
                  padding: 0;
                }
                img {
                  width: 100%;
                  height: 100%;
                }
              </style>
            </head>
            <body>
            <img src="${img.src}" />
            </body>
          </html>
        `);
                newTab.document.close();

                img.onload = function () {
                    newTab.print();
                    newTab.onafterprint = function () {
                        newTab.close();
                    };
                };
            })
            .catch(function (error) {
                console.error("Error generating image: ", error);
            });
    };

    return (
        <div>
            <h1>Test</h1>
            <Flex
                id="elementToPrint"
                direction="column"
                justify="space-between"
                align="center"
                w="144px"
                h="94px"
                // style={{
                //     border: "1px solid black",
                // }}
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
            <button onClick={handlePrintClick} style={{ marginTop: "50px" }}>
                Print
            </button>
        </div>
    );
};

export default Test;

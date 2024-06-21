import {
    Box,
    Button,
    Container,
    Divider,
    Flex,
    NumberInput,
    SimpleGrid,
    Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { doc, onSnapshot } from "firebase/firestore";
import * as htmlToImage from "html-to-image";
import { useEffect, useState } from "react";
import { db } from "../../Firebase-config";
import ChangePricesModal from "./ChangePricesModal";

export default function Test() {
    const [opened, { open, close }] = useDisclosure(false);
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "test", "prices"), (docSnapshot) => {
            const data = docSnapshot.data();

            const newData = Object.entries(data).map(([name, price]) => ({
                name,
                price: price || "",
            }));

            if (data) {
                const newDataa = newData
                    .filter((input) => input.price)
                    .map((input) => ({
                        name: input.name,
                        price: input.price,
                        quantity: "",
                        total: 0,
                    }));

                console.log(newDataa);
                setInputs(newDataa);
            } else {
                setInputs([]);
            }
        });

        return () => unsub();
    }, []);

    function formatDate() {
        const date = new Date();
        const options = { weekday: "long", month: "numeric", day: "numeric" };
        const locale = "ar-EG"; // Arabic (Egypt) locale
        const formattedDate = date.toLocaleDateString(locale, options);
        let hour = date.getHours();
        const minute = date.getMinutes();

        // Convert hour to 12-hour format
        hour = hour % 12;
        hour = hour ? hour : 12; // '0' should be '12' for 12-hour clock

        return (
            formattedDate +
            " - " +
            hour +
            ":" +
            (minute < 10 ? "0" + minute : minute)
        );
    }

    const [customAddition, setCustomAddition] = useState(null);
    const [customReduction, setCustomReduction] = useState(null);

    const handleInputChange = (index, key, value) => {
        const newInputs = [...inputs];
        newInputs[index][key] = value;
        newInputs[index].total =
            newInputs[index].price * newInputs[index].quantity;
        setInputs(newInputs);
    };

    const totalPrice =
        inputs.reduce((acc, input) => acc + input.total, 0) -
        customReduction +
        customAddition;

    const resetQuantities = () => {
        const resetInputs = inputs.map((input) => ({
            ...input,
            quantity: "",
            total: 0,
        }));
        setInputs(resetInputs);
        setCustomAddition("");
        setCustomReduction("");
    };

    const aggregateQuantities = () => {
        const nameQuantityMap = {};
        inputs.forEach((input) => {
            if (nameQuantityMap[input.name]) {
                nameQuantityMap[input.name] += input.quantity;
            } else {
                nameQuantityMap[input.name] = input.quantity;
            }
        });
        return nameQuantityMap;
    };

    const aggregatedQuantities = aggregateQuantities();

    // const handlePrint = () => {
    //     //<div style="height: 52%;">&nbsp;</div>
    //     const printWindow = window.open("", "_blank");
    //     printWindow.document.write(`
    //         <html>
    //         <head>
    //             <title>Print</title>
    //         </head>
    //         <body>
    //             <div style="text-align: center;style="font-size: 35px;">
    //                 ${Object.entries(aggregatedQuantities)
    //                     .map(([name, quantity]) =>
    //                         quantity >= 1
    //                             ? `<span style="font-size: 30px; font-weight: bold;">${name}:${quantity} </span>`
    //                             : null
    //                     )
    //                     .join("")}
    //                     <div style="font-weight: bold;">
    //                     ${formatDate()}
    //                     </div>
    //             </div>
    //         </body>
    //         </html>
    //     `);
    //     printWindow.document.close();
    //     printWindow.print();
    //     printWindow.close();
    //     resetQuantities();
    // };

    const handlePrint = () => {
        const element = document.getElementById("elementToPrint");
        htmlToImage
            .toSvg(element, { width: 144, height: 95 })
            .then(function (dataUrl) {
                const newTab: Window = window.open("", "_blank");
                newTab.document.write(`
                    <html>
                        <head>
                            <title>طباعة</title>
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
        <Container>
            <ChangePricesModal opened={opened} close={close} />

            <Flex justify="center" gap="md" pt="md">
                <Button onClick={open} justify="center">
                    تغيير الأسعار
                </Button>
                <Button onClick={resetQuantities} justify="center">
                    Reset
                </Button>
            </Flex>
            <Divider my={"md"} />
            <SimpleGrid
                cols={3}
                // key={index}
                pt={10}
                // gap="md"
                // justify="center"
            >
                {inputs.map((input, index) => (
                    <NumberInput
                        hideControls
                        key={index}
                        label={`${input.name} (${input.price} جنيه)`}
                        value={input.quantity}
                        onChange={(value) =>
                            handleInputChange(index, "quantity", value)
                        }
                        min={0}
                        suffix={` = ${input.total} جنيه`}
                    />
                ))}
            </SimpleGrid>
            <Divider my={"md"} />
            <Stack align="center">
                <NumberInput
                    hideControls
                    label={"مدفوع"}
                    value={customReduction}
                    onChange={(value) => setCustomReduction(value)}
                    min={0}
                />
                <NumberInput
                    hideControls
                    label={"الدواء"}
                    value={customAddition}
                    onChange={(value) => setCustomAddition(value)}
                    min={0}
                />
                <Box ta="center">الاجمالى: {totalPrice}</Box>
                <Box id="elementToPrint" w="144px" h="94px">
                    <Flex
                        h="50%"
                        style={{
                            fontSize: "12px",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        1 سم على كل لتر مياه من ثانى يوم لمدة 3 ايام
                    </Flex>
                    <Flex
                        h="50%"
                        style={{
                            fontSize: "12px",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        10 سم على كل لتر مياه من اول يوم لحد ما تخلص
                    </Flex>
                    {/* <Flex direction="column" h="50%">
                        <Flex gap="3px" wrap="wrap" justify="center">
                            {Object.entries(aggregatedQuantities)
                                .filter(([name, quantity]) => quantity >= 1)
                                .map(([name, quantity]) => (
                                    <span
                                        key={name}
                                        style={{
                                            fontSize: "10px",
                                            fontWeight: "bold",
                                            margin: 0,
                                        }}
                                    >
                                        {name}:{quantity}
                                    </span>
                                ))}
                        </Flex>
                        <div
                            style={{
                                fontSize: "10px",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        >
                            {formatDate()}
                        </div>
                    </Flex>
                    <Flex gap="3px" wrap="wrap" justify="center" h="50%">
                        {inputs.map(
                            (item) =>
                                item.quantity >= 1 && (
                                    <>
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                                margin: 0,
                                            }}
                                        >
                                            {item.name}:
                                            {item.quantity * item.price} ج
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                                margin: 0,
                                            }}
                                        >
                                            {`العلاج:${customAddition} ج`}
                                        </span>
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                fontWeight: "bold",
                                                margin: 0,
                                            }}
                                        >
                                            {`الباقى:${totalPrice} ج`}
                                        </span>
                                    </>
                                )
                        )}
                    </Flex> */}
                </Box>
                <Button onClick={handlePrint}>طباعة</Button>
            </Stack>
        </Container>
    );
}

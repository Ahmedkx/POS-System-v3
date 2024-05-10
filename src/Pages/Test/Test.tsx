import {
    Box,
    Button,
    Container,
    Flex,
    NumberInput,
    SimpleGrid,
    Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ChangePricesModal from "./ChangePricesModal";

export default function Test() {
    const [opened, { open, close }] = useDisclosure(false);
    const [inputs, setInputs] = useState([
        { name: "ابيض", price: 35, quantity: "", total: 0 },
        { name: "ساسو", price: 21, quantity: "", total: 0 },
        { name: "فيومى", price: 16, quantity: "", total: 0 },
        // { name: "ديوك", price: 24, quantity: "", total: 0 },
        { name: "بلدى", price: 12, quantity: "", total: 0 },
        // { name: "مسكوفى", price: 53, quantity: "", total: 0 },
        // { name: "مولر", price: 46, quantity: "", total: 0 },
        // { name: "سمان", price: 10, quantity: "", total: 0 },
    ]);

    // useEffect(() => {
    //     const unsub = onSnapshot(doc(db, "Test", "test"), (doc) => {
    //         setInputs(doc.data().inputs);
    //     });
    // }, []);

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
            "&nbsp; - &nbsp;" +
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

    const handlePrint = () => {
        //<div style="height: 52%;">&nbsp;</div>
        const printWindow = window.open("", "_blank");
        printWindow.document.write(`
            <html>
            <head>
                <title>Print</title>
            </head>
            <body>
                <div style="text-align: center;style="font-size: 35px;">
                    ${Object.entries(aggregatedQuantities)
                        .map(([name, quantity]) =>
                            quantity >= 1
                                ? `<span style="font-size: 30px; font-weight: bold;">${name}:${quantity} </span>`
                                : null
                        )
                        .join("")}
                        <div style="font-weight: bold;">
                        ${formatDate()}
                        </div>
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
        resetQuantities();
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
            <Stack align="center">
                <NumberInput
                    mt="sm"
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
                <Box mt="md" ta="center">
                    الاجمالى: {totalPrice}
                </Box>
                <Button onClick={handlePrint}>طباعة</Button>
            </Stack>
        </Container>
    );
}

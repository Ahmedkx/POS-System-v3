import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Text, SimpleGrid, ActionIcon, Select, Modal } from "@mantine/core";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import Cell from "../Products/Components/Cell";
import { useProductsStore } from "../../Store";
import { useDisclosure } from "@mantine/hooks";
import { isNotEmpty, useForm } from "@mantine/form";
import { addDoc, collection, doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase-config";

export default function Receipt() {
    const navigate = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const products = useProductsStore((state) => state.products);
    const [receipt, setReceipt] = useState([]);

    const totalProfit = receipt.reduce(
        (sum, product) => sum + (product.sellPrice1 - product.price) * product.quantity,
        0
    );
    const totalPrice = receipt.reduce(
        (sum, product) => sum + product.sellPrice1 * product.quantity,
        0
    );
    const totalQuantity = receipt.reduce((sum, product) => sum + product.quantity, 0);

    const form = useForm({
        initialValues: {
            productId: "",
        },

        validate: {
            productId: isNotEmpty("يجب اختيار منتج"),
        },
    });

    function addProduct(values) {
        close();
        const product = products.find((p) => p.id === values.productId);
        const objIndex = receipt.findIndex((obj) => obj.id == values.productId);
        if (objIndex == -1) {
            setReceipt((p) => [...p, { ...product, quantity: 1 }]);
        } else {
            receipt[objIndex].quantity++;
        }
        form.reset();
    }

    // function editQuantity(productId, quantity) {
    //     const objIndex = receipt.findIndex((obj) => obj.id == productId);
    //     if (receipt[objIndex].quantity >= 1) {
    //         receipt[objIndex].quantity = receipt[objIndex].quantity + quantity;
    //     } else {
    //         deleteProduct(productId);
    //     }
    // }

    function editQuantity(productId, quantity) {
        const objIndex = receipt.findIndex((obj) => obj.id === productId);
        const updatedReceipt = [...receipt];
        receipt[objIndex].quantity = receipt[objIndex].quantity + quantity;
        setReceipt(updatedReceipt);

        if (receipt[objIndex].quantity == 0) {
            deleteProduct(productId);
        }
    }

    function deleteProduct(productId: any) {
        const objIndex = receipt.findIndex((obj) => obj.id === productId);
        const newReceipt = receipt.slice();
        newReceipt.splice(objIndex, 1);
        setReceipt(newReceipt);
    }

    const today = new Date();
    const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    async function saveRecipt() {
        setLoading(true);
        await addDoc(collection(db, "Sales"), {
            timeStamp: dateString,
            totalPrice,
            totalProfit,
            totalQuantity,
            products: receipt,
        });
        receipt.map(async (product) => {
            const productRef = doc(db, "Products", product.id);
            const productDoc = await getDoc(productRef);
            const currentQuantity = productDoc.data().quantity;
            const updatedQuantity = Math.max(0, currentQuantity - product.quantity);
            updateDoc(productRef, {
                quantity: updatedQuantity,
            });
        });
        setLoading(false);
        navigate("/");
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="اضافة منتج" centered>
                <form onSubmit={form.onSubmit((values) => addProduct(values))}>
                    <Select
                        data={products.map((product) => {
                            return { label: product.name, value: `${product.id}` };
                        })}
                        label="اضافة منتج"
                        placeholder="اختر المنتج"
                        searchable
                        {...form.getInputProps("productId")}
                    />
                    <Flex justify="center">
                        <Button leftSection={<IconPlus />} type="submit" mt="md">
                            اضافة
                        </Button>
                    </Flex>
                </form>
            </Modal>
            <Flex pt="lg" direction="column">
                <Text size="xl" ta="center" fw="bold" mb="md">
                    فاتورة
                </Text>
                <Button
                    style={{ width: "fit-content" }}
                    mb="md"
                    leftSection={<IconPlus />}
                    onClick={open}
                >
                    اضافة منتج
                </Button>
                <SimpleGrid cols={6} mb={5} pb={10} style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <Cell>الاسم</Cell>
                    <Cell>العبوة</Cell>
                    <Cell>الشركة</Cell>
                    <Cell>سعر البيع</Cell>
                    <Cell>الكمية</Cell>
                    <Cell>حذف</Cell>
                </SimpleGrid>
                {receipt.map((product) => (
                    <SimpleGrid
                        key={product.id}
                        cols={6}
                        pb={10}
                        pt={10}
                        style={{ borderBottom: "1px solid #e0e0e0" }}
                    >
                        <Cell>{product.name}</Cell>
                        <Cell>{product.size}</Cell>
                        <Cell>{product.company}</Cell>
                        <Cell>{product.sellPrice1}</Cell>
                        <Cell>
                            <Flex justify="center" align="center">
                                <ActionIcon radius="xl" onClick={() => editQuantity(product.id, 1)}>
                                    <IconPlus />
                                </ActionIcon>
                                <Text component="span" mx={10} fw="bold">
                                    {product.quantity}
                                </Text>
                                <ActionIcon
                                    radius="xl"
                                    onClick={() => editQuantity(product.id, -1)}
                                >
                                    <IconMinus />
                                </ActionIcon>
                            </Flex>
                        </Cell>
                        <Cell>
                            <ActionIcon
                                variant="filled"
                                color="red"
                                radius="xl"
                                onClick={() => deleteProduct(product.id)}
                            >
                                <IconX />
                            </ActionIcon>
                        </Cell>
                    </SimpleGrid>
                ))}
                <SimpleGrid cols={1} pb={10} pt={10} style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <Cell>الاجمالى : {totalPrice} جنيه</Cell>
                </SimpleGrid>
                <Button
                    mt="md"
                    w="100px"
                    mx="auto"
                    loading={loading}
                    disabled={receipt.length == 0}
                    onClick={saveRecipt}
                >
                    حفظ
                </Button>
            </Flex>
        </>
    );
}

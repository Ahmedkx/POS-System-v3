import {
    ActionIcon,
    Button,
    Flex,
    Modal,
    Select,
    SimpleGrid,
    Text,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconX } from "@tabler/icons-react";
import {
    addDoc,
    collection,
    doc,
    getDoc,
    runTransaction,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../Firebase-config";
import useBarcodeScanner from "../../Hooks/useBarcodeScanner";
import { useProductsStore } from "../../Store";
import Cell from "../Products/Components/Cell";

export default function Receipt() {
    const navigate = useNavigate();
    const location = useLocation();
    const [opened, { open, close }] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const products = useProductsStore((state) => state.products);
    const [receipt, setReceipt] = useState([]);
    useEffect(() => {
        if (location.state?.barcode) {
            addProductScan(location.state?.barcode);
        }
    }, []);

    useBarcodeScanner((scannedBarcode) => addProductScan(scannedBarcode));

    const totalProfit = receipt.reduce(
        (sum, product) =>
            sum + (product.sellPrice1 - product.price) * product.quantity,
        0
    );
    const totalPrice = receipt.reduce(
        (sum, product) => sum + product.sellPrice1 * product.quantity,
        0
    );
    const totalQuantity = receipt.reduce(
        (sum, product) => sum + product.quantity,
        0
    );

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
            const updatedReceipt = [...receipt];
            updatedReceipt[objIndex] = {
                ...updatedReceipt[objIndex],
                quantity: updatedReceipt[objIndex].quantity + 1,
            };
            setReceipt(updatedReceipt);
        }
        form.reset();
    }

    async function addProductScan(value: string) {
        const scannedBarcode = value.split(":")[0];
        const scannedBarcodeWithDate = value;

        const existingProductIndex = receipt.findIndex(
            (obj) => obj.barcodeWithDate === scannedBarcodeWithDate
        );

        if (existingProductIndex === -1) {
            // Product doesn't exist in receipt, create a new object for it
            const product = products.find((p) => p.barcode == scannedBarcode);
            if (product !== undefined) {
                product.barcodeWithDate = scannedBarcodeWithDate;
                setReceipt([...receipt, { ...product, quantity: 1 }]);
            } else {
                // Product not found in products array
                console.log("Product not found with barcode:", scannedBarcode);
            }
        } else {
            // Product already exists in receipt, increase quantity
            const updatedReceipt = [...receipt];
            updatedReceipt[existingProductIndex] = {
                ...updatedReceipt[existingProductIndex],
                quantity: updatedReceipt[existingProductIndex].quantity + 1,
            };
            setReceipt(updatedReceipt);
        }
    }

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

    async function saveRecipt() {
        setLoading(true);
        await addDoc(collection(db, "Sales"), {
            timeStamp: serverTimestamp(),
            totalPrice,
            totalProfit,
            totalQuantity,
            products: receipt,
        });
        receipt.map(async (product) => {
            const productRef = doc(db, "Products", product.id);
            const productDoc = await getDoc(productRef);
            const currentQuantity = productDoc.data().quantity;
            const updatedQuantity = Math.max(
                0,
                currentQuantity - product.quantity
            );
            updateDoc(productRef, {
                quantity: updatedQuantity,
            });
            if (product.barcodeWithDate) {
                try {
                    await runTransaction(db, async (transaction) => {
                        const docRef = doc(
                            db,
                            "Quantities",
                            product.barcodeWithDate
                        );
                        const quantityDoc = await transaction.get(docRef);
                        if (!quantityDoc.exists()) {
                            throw "Document does not exist!";
                        }
                        if (quantityDoc.data().quantity <= product.quantity) {
                            transaction.delete(docRef);
                        } else {
                            const newQuantity =
                                quantityDoc.data().quantity - product.quantity;
                            transaction.update(docRef, {
                                quantity: newQuantity,
                            });
                        }
                    });
                } catch (e) {
                    console.log("Transaction failed: ", e);
                }
            }
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
                            return {
                                label: product.name,
                                value: `${product.id}`,
                            };
                        })}
                        label="اضافة منتج"
                        placeholder="اختر المنتج"
                        searchable
                        {...form.getInputProps("productId")}
                    />
                    <Flex justify="center">
                        <Button
                            leftSection={<IconPlus />}
                            type="submit"
                            mt="md"
                        >
                            اضافة
                        </Button>
                    </Flex>
                </form>
            </Modal>
            <Flex pt="lg" direction="column">
                {/* <Text size="xl" ta="center" fw="bold" mb="md">
                    فاتورة
                </Text> */}
                <Button
                    style={{ width: "fit-content" }}
                    mb="md"
                    leftSection={<IconPlus />}
                    onClick={open}
                >
                    اضافة منتج
                </Button>
                <SimpleGrid
                    cols={7}
                    mb={5}
                    pb={10}
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                >
                    <Cell>الاسم</Cell>
                    <Cell>العبوة</Cell>
                    <Cell>الشركة</Cell>
                    <Cell>سعر البيع</Cell>
                    <Cell>الكمية</Cell>
                    <Cell>تاريخ الصلاحية</Cell>
                    <Cell>حذف</Cell>
                </SimpleGrid>
                {receipt.map((product) => (
                    <SimpleGrid
                        key={product.barcodeWithDate}
                        cols={7}
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
                                {/* <ActionIcon
                                    radius="xl"
                                    onClick={() => editQuantity(product.id, 1)}
                                    >
                                    <IconPlus />
                                </ActionIcon> */}
                                <Text component="span" mx={10} fw="bold">
                                    {product.quantity}
                                </Text>
                                {/* <ActionIcon
                                    radius="xl"
                                    onClick={() => editQuantity(product.id, -1)}
                                    >
                                    <IconMinus />
                                </ActionIcon> */}
                            </Flex>
                        </Cell>
                        <Cell>{product.barcodeWithDate?.split(":")[1]}</Cell>
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
                <SimpleGrid
                    cols={1}
                    pb={10}
                    pt={10}
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                >
                    <Cell>الاجمالى : {totalPrice} جنيه</Cell>
                </SimpleGrid>
                <Button
                    mt="md"
                    // mx="auto"
                    // size="100"
                    loading={loading}
                    disabled={receipt.length == 0}
                    onClick={saveRecipt}
                >
                    حفظ
                </Button>
                <Button
                    mt="md"
                    // mx="auto"
                    // size="100"
                    onClick={() => addProductScan("1514:0324")}
                >
                    Scan
                </Button>
            </Flex>
        </>
    );
}

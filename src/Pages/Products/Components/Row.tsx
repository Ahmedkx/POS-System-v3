import { useState } from "react";
import { ActionIcon, Flex, SimpleGrid, Tooltip, rem } from "@mantine/core";
import { IconPencil, IconPlus, IconPrinter } from "@tabler/icons-react";

import Cell from "./Cell";
import PrintModal from "./PrintModal";
import AddModal from "./AddModal";
import { Link } from "react-router-dom";
import useFormattedDate from "../../../Hooks/useFormattedDate";
import { useLoginStore } from "../../../Store";

export default function Rows({ product }: any) {
    const isAdmin = useLoginStore((state) => state.admin);
    const [printModal, setPrintModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    // console.log(product);

    return (
        <div>
            <AddModal opened={addModal} setOpened={setAddModal} product={product} />
            <PrintModal opened={printModal} setOpened={setPrintModal} barcode={product.barcode} />

            <SimpleGrid
                cols={8}
                style={{ borderBottom: "1px solid #e0e0e0" }}
                pb={rem(10)}
                pt={rem(10)}
            >
                <Cell>{product.name}</Cell>
                <Cell>{product.size}</Cell>
                <Cell>{product.company}</Cell>
                {isAdmin && <Cell>{product.price}</Cell>}
                <Cell>{product.sellPrice1}</Cell>
                {isAdmin && <Cell>{product.quantity}</Cell>}
                {isAdmin && <Cell>{useFormattedDate(product.lastUpdated?.seconds)}</Cell>}
                {isAdmin && (
                    <Flex gap={5} justify={"center"} align={"center"}>
                        <ActionIcon
                            variant="default"
                            size="xl"
                            radius="xl"
                            aria-label="Settings"
                            onClick={() => setAddModal(true)}
                        >
                            <Tooltip label="اضافة" offset={10} withArrow>
                                <IconPlus style={{ width: "70%", height: "70%" }} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>

                        <ActionIcon
                            variant="default"
                            size="xl"
                            radius="xl"
                            aria-label="Settings"
                            onClick={() => setPrintModal(true)}
                            disabled={!product.autoBarcode}
                        >
                            <Tooltip label="طباعة الباركود" offset={10} withArrow>
                                <IconPrinter style={{ width: "70%", height: "70%" }} stroke={1.5} />
                            </Tooltip>
                        </ActionIcon>

                        <Link to={`/products/edit/${product.id}`}>
                            <ActionIcon
                                variant="default"
                                size="xl"
                                radius="xl"
                                aria-label="Settings"
                            >
                                <Tooltip label="تعديل" offset={10} withArrow>
                                    <IconPencil
                                        style={{ width: "70%", height: "70%" }}
                                        stroke={1.5}
                                    />
                                </Tooltip>
                            </ActionIcon>
                        </Link>
                    </Flex>
                )}
            </SimpleGrid>
        </div>
    );
}

import { ActionIcon, Flex, SimpleGrid, Tooltip, rem } from "@mantine/core";
import {
    IconPencil,
    IconPlus,
    IconPrinter,
    IconCoinPound,
} from "@tabler/icons-react";
import { useState } from "react";

import { Link } from "react-router-dom";
import { useLoginStore } from "../../../Store";
import AddModal from "./AddModal";
import Cell from "./Cell";
import ChangePriceModal from "./ChnagePriceModal";
import PrintModal from "./PrintModal";

export default function Rows({ product }: any) {
    const isAdmin = useLoginStore((state) => state.admin);
    const [printModal, setPrintModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [changePriceModal, setChangePriceModal] = useState(false);

    function daysAgo(unixTimestamp) {
        const date = new Date(unixTimestamp * 1000);
        const now = new Date();
        const difference = now - date;
        const daysAgo = difference / (1000 * 60 * 60 * 24);
        const numberOfDays = Math.floor(daysAgo);

        if (numberOfDays || numberOfDays == 0) {
            return `منذ ${numberOfDays} يوم`;
        }
    }

    return (
        <div>
            <AddModal
                opened={addModal}
                setOpened={setAddModal}
                product={product}
            />
            <PrintModal
                opened={printModal}
                setOpened={setPrintModal}
                barcode={product.barcode}
            />
            <ChangePriceModal
                opened={changePriceModal}
                setOpened={setChangePriceModal}
                id={product.id}
            />

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
                <Cell>{daysAgo(product?.lastUpdated?.seconds)}</Cell>
                {isAdmin && (
                    <Flex gap={5} justify={"center"} align={"center"}>
                        <ActionIcon
                            variant="default"
                            size="xl"
                            radius="xl"
                            aria-label="Settings"
                            onClick={() => setChangePriceModal(true)}
                        >
                            <Tooltip label="تعديل السعر" offset={10} withArrow>
                                <IconCoinPound
                                    style={{ width: "70%", height: "70%" }}
                                    stroke={1.5}
                                />
                            </Tooltip>
                        </ActionIcon>

                        <ActionIcon
                            variant="default"
                            size="xl"
                            radius="xl"
                            aria-label="Settings"
                            onClick={() => setAddModal(true)}
                        >
                            <Tooltip label="اضافة" offset={10} withArrow>
                                <IconPlus
                                    style={{ width: "70%", height: "70%" }}
                                    stroke={1.5}
                                />
                            </Tooltip>
                        </ActionIcon>

                        <ActionIcon
                            variant="default"
                            size="xl"
                            radius="xl"
                            aria-label="Settings"
                            onClick={() => setPrintModal(true)}
                        >
                            <Tooltip
                                label="طباعة الباركود"
                                offset={10}
                                withArrow
                            >
                                <IconPrinter
                                    style={{ width: "70%", height: "70%" }}
                                    stroke={1.5}
                                />
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

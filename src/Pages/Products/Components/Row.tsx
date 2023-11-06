import { ActionIcon, Flex, SimpleGrid, Tooltip, rem } from "@mantine/core";
import { IconPencil, IconPlus, IconPrinter } from "@tabler/icons-react";

import Cell from "./Cell";
import PrintModal from "./PrintModal";
import { useState } from "react";
import AddModal from "./AddModal";

export default function Rows({ product }: any) {
    const [printModal, setPrintModal] = useState(false);
    const [addModal, setAddModal] = useState(false);

    return (
        <>
            <AddModal opened={addModal} setOpened={setAddModal} />
            <PrintModal opened={printModal} setOpened={setPrintModal} />

            <SimpleGrid
                key={product.name}
                cols={8}
                style={{ borderBottom: "1px solid #e0e0e0" }}
                pb={rem(10)}
                pt={rem(10)}
            >
                <Cell>{product.name}</Cell>
                <Cell>{product.company}</Cell>
                <Cell>{product.size}</Cell>
                <Cell>{product.price}</Cell>
                <Cell>{product.price}</Cell>
                <Cell>{product.price}</Cell>
                <Cell>{product.quantity}</Cell>
                <Flex gap={5} justify={"center"}>
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
                        <Tooltip label="طباعة الباركود" offset={10} withArrow>
                            <IconPrinter
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
                    >
                        <Tooltip label="تعديل" offset={10} withArrow>
                            <IconPencil
                                style={{ width: "70%", height: "70%" }}
                                stroke={1.5}
                            />
                        </Tooltip>
                    </ActionIcon>
                </Flex>
            </SimpleGrid>
        </>
    );
}
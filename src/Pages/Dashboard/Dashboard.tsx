import { Center, Text, Space } from "@mantine/core";
import barcodeScan from "../../Images/barcodepng.parspng.com-6.webp";

export default function Dashboard() {
    return (
        <>
            <Space h="50" />
            <Center style={{ flexDirection: "column" }}>
                <Text size="xl" fw="bold" ta="center">
                    اقرأ الباركود لانشاء فاتورة بيع جديدة
                </Text>
                <img src={barcodeScan} alt="Scanner" width="400px" />
            </Center>
        </>
    );
}

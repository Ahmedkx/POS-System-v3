import { Center, Text, Button, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import barcodeScan from "../../Images/barcodepng.parspng.com-6.webp";

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <Center pt="xl" style={{ flexDirection: "column" }}>
            <Button onClick={() => navigate("/receipt")}>انشاء فاتورة</Button>
            <Text fw="bold" mt="xl">
                أو
            </Text>
            <Text size="xl" fw="bold" ta="center" mt="xl">
                اقرأ الباركود لانشاء فاتورة جديدة
            </Text>
            <Image src={barcodeScan} w="100%" maw="400px" alt="Scanner" />
        </Center>
    );
}

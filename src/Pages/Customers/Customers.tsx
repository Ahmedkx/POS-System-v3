import { Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import AddCustomerModal from "./Components/AddCustomerModal";

export default function Customers() {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div>
            <AddCustomerModal opened={opened} close={close} />

            <Text size="xl" fw="bold" mb="lg">
                الاحصائيات
            </Text>
            <Button onClick={open}>اضافة عميل</Button>
        </div>
    );
}

import {
    Text,
    TextInput,
    PasswordInput,
    Stack,
    Button,
    Paper,
} from "@mantine/core";

import { useForm, isNotEmpty } from "@mantine/form";
import Logo from "../../Images/Logo.tsx";
import { IconUser, IconLock } from "@tabler/icons-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            username: "",
            password: "",
        },

        validate: {
            username: isNotEmpty("يجب ادخال اسم المستخدم"),
            password: isNotEmpty("يجب ادخال كلمة السر"),
        },
    });

    return (
        <Stack align="center" justify="center" bg="#f9fafb" h="100vh">
            <Logo width="40px" />
            <Text size="24px" fw="bold" ta="center" mb={20}>
                تسجيل الدخول
            </Text>
            <Paper
                shadow="lg"
                p={48}
                style={{ maxWidth: "480px", width: "100%" }}
            >
                <form onSubmit={form.onSubmit((values) => navigate("/"))}>
                    <TextInput
                        label="اسم المستخدم"
                        withAsterisk
                        leftSection={<IconUser />}
                        {...form.getInputProps("username")}
                    />
                    <PasswordInput
                        label="كلمة المرور"
                        withAsterisk
                        leftSection={<IconLock />}
                        {...form.getInputProps("password")}
                        mt={30}
                    />
                    <Button type="submit" variant="filled" mt={30} w="100%">
                        تسجيل الدخول
                    </Button>
                </form>
            </Paper>
        </Stack>
    );
}

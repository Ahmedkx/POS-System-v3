import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
    Text,
    TextInput,
    PasswordInput,
    Stack,
    Button,
    Paper,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useForm, isNotEmpty } from "@mantine/form";
import Logo from "../../Images/Logo.tsx";
import { IconUser, IconLock } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLoginStore } from "../../Store.tsx";

export default function Login() {
    const toggleUser = useLoginStore((state) => state.toggleUser);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: isNotEmpty("يجب ادخال اسم المستخدم"),
            password: isNotEmpty("يجب ادخال كلمة السر"),
        },
    });

    async function login(values) {
        if (values.email === "1" && values.password === "159357") {
            setloading(true);
            toggleUser();
            navigate("/");
            setloading(false);
        }
    }

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
                <form onSubmit={form.onSubmit((values) => login(values))}>
                    <TextInput
                        label="اسم المستخدم"
                        withAsterisk
                        leftSection={<IconUser />}
                        {...form.getInputProps("email")}
                    />
                    <PasswordInput
                        label="كلمة المرور"
                        withAsterisk
                        leftSection={<IconLock />}
                        {...form.getInputProps("password")}
                        mt={30}
                    />
                    <Button
                        type="submit"
                        variant="filled"
                        mt={30}
                        w="100%"
                        loading={loading}
                    >
                        تسجيل الدخول
                    </Button>
                </form>
            </Paper>
        </Stack>
    );
}

import {
    Center,
    Text,
    TextInput,
    PasswordInput,
    Stack,
    Button,
} from "@mantine/core";

import { useForm, isNotEmpty } from "@mantine/form";

export default function Login() {
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
        <Center>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <Stack justify="center" h="100vh" style={{ maxWidth: "400px" }}>
                    <Text size="40px" fw="bold" ta="center" mb={20}>
                        تسجيل الدخول
                    </Text>
                    <TextInput
                        label="اسم المستخدم"
                        // placeholder="اسم المستخدم"
                        withAsterisk
                        {...form.getInputProps("username")}
                    />
                    <PasswordInput
                        label="كلمة المرور"
                        // placeholder="كلمة المرور"
                        withAsterisk
                        {...form.getInputProps("password")}
                    />
                    <Button type="submit" variant="filled">
                        تسجيل الدخول
                    </Button>
                </Stack>
            </form>
        </Center>
    );
}

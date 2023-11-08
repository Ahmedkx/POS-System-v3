import { Autocomplete } from "@mantine/core";

export default function Select({ data, form }: any) {
    return (
        <Autocomplete
            label="اسم sssssssssss"
            placeholder="اختيار اسم الشركة"
            data={data}
            {...form.getInputProps("companyName")}
        />
    );
}

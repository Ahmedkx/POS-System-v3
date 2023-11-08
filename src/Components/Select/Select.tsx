import { useEffect, useState } from "react";
import { InputBase, Combobox, useCombobox, ScrollArea } from "@mantine/core";

export default function Select({ data, label, placeholder }: any) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    // const [value, setValue] = useState<string | null>(null);
    const [value, setValue] = useState<string | null>("");
    const [search, setSearch] = useState("");

    const shouldFilterOptions = data.every((item) => item !== search);
    const filteredOptions = shouldFilterOptions
        ? data.filter((item) =>
              item.toLowerCase().includes(search.toLowerCase().trim())
          )
        : data;

    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item} key={item}>
            {item}
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={(val) => {
                setValue(val);
                setSearch(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => {
                        combobox.closeDropdown();
                        setSearch(value || "");
                    }}
                    label={label}
                    placeholder={placeholder}
                    value={search}
                    onChange={(event) => {
                        combobox.updateSelectedOptionIndex();
                        setSearch(event.currentTarget.value);
                    }}
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <ScrollArea.Autosize type="always" mah={200}>
                        {options.length > 0 ? (
                            options
                        ) : (
                            <Combobox.Empty>
                                لم يتم العثور على شيء
                            </Combobox.Empty>
                        )}
                    </ScrollArea.Autosize>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

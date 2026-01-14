import { Box, Input, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export type SelectOption = {
  label: string;
  value: string;
};

type Props = {
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  width?: string;
  onEnter?: (value: string) => void;
  initValue?: string;
};

const SelectOrCreateInput = ({
  options,
  placeholder = "Select or type value",
  onChange,
  width = "320px",
  onEnter,
  onSubmit,
  initValue,
}: Props) => {
  const [value, setValue] = useState(initValue ? initValue : "");
  const [open, setOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(value.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (opt: SelectOption) => {
    setValue(opt.label);
    setOpen(false);
    onChange?.(opt.value);
    onSubmit?.(opt.value);
  };

  const handleInputChange = (val: string) => {
    setValue(val);
    setOpen(true);
    onChange?.(val);
  };

  return (
    <Box ref={wrapperRef} position="relative" width={width}>
      <Input
        placeholder={placeholder}
        value={value}
        onFocus={() => setOpen(true)}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // 👈 rất quan trọng
            setOpen(false);

            // báo giá trị hiện tại cho parent
            onChange?.(value);
            onSubmit?.(value);
          }
        }}
      />

      {open && (
        <Box
          position="absolute"
          top="100%"
          left="0"
          right="0"
          mt="2"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          bg="white"
          zIndex="10"
          maxH="200px"
          overflowY="auto"
          boxShadow="md"
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <Box
                key={opt.value}
                px="3"
                py="2"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleSelect(opt)}
              >
                {opt.label}
              </Box>
            ))
          ) : (
            <Text px="3" py="2" color="gray.500" fontSize="sm">
              No matching options
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SelectOrCreateInput;

import { Box } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

type AddSectionForm = {
  sectionTitle: string;
  reviewConfigCode: string;
  departmentCode: string;
  positionCode: string;
};

type Props = {
  suggestions: string[];
};

export const SectionTitleAutoComplete: React.FC<Props> = ({ suggestions }) => {
  const { watch, setValue } = useFormContext<AddSectionForm>();

  const value = watch("sectionTitle") ?? "";

  const filtered = value
    ? suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    : [];

  if (filtered.length === 0) return null;

  return (
    <Box
      mt={1}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      bg="white"
      zIndex={10}
    >
      {filtered.map((item) => (
        <Box
          key={item}
          px={3}
          py={2}
          cursor="pointer"
          _hover={{ bg: "gray.100" }}
          onClick={() =>
            setValue("sectionTitle", item, {
              shouldValidate: true,
              shouldDirty: true,
            })
          }
        >
          {item}
        </Box>
      ))}
    </Box>
  );
};

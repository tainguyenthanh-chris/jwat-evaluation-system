import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

export interface Section {
  defaultReviewConfigCode: string;
  reviewConfigType: string;
  sectionId: string;
  sectionTitle: string;
  cueList: { cueCd: string }[];
}

export interface SectionItemProps {
  section: Section;
  onAddToForm: () => void;
  onEdit: (sectionId: string) => void;
  onDelete: (sectionId: string) => void;
}

export const SectionItem = ({
  section,
  onAddToForm,
  onEdit,
  onDelete,
}: SectionItemProps) => {
  return (
    <Flex
      cursor="pointer"
      padding="12px 16px"
      flexDirection="column"
      gap="8px"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      _hover={{ bg: "gray.50" }}
      transition="background-color 0.2s"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="sm" fontWeight="semibold">
          {section.sectionTitle}
        </Text>
        <Flex gap="4px">
          {onAddToForm && (
            <IconButton size="xs" variant="ghost" onClick={onAddToForm}>
              <FaPlus />
            </IconButton>
          )}
          {onEdit && (
            <IconButton
              size="xs"
              variant="ghost"
              onClick={() => onEdit(section.sectionId)}
            >
              <FaEdit />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              size="xs"
              variant="ghost"
              colorScheme="red"
              onClick={() => onDelete(section.sectionId)}
            >
              <FaTrash />
            </IconButton>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

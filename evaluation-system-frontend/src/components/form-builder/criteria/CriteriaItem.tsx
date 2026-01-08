import { Flex, IconButton, Text } from "@chakra-ui/react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import type { Criteria } from "../../../types/criteria";

export interface CriteriaItemProps {
  criteria: Partial<Criteria>;
  onAddToForm?: () => void;
  onEdit?: (criteriaId: string | null) => void;
  onDelete?: (criteriaId: string | null) => void;
  disabled?: boolean;
}

export const CriteriaItem = ({
  criteria,
  onAddToForm,
  onEdit,
  onDelete,
  disabled,
}: CriteriaItemProps) => {
  return (
    <Flex
      cursor="pointer"
      padding="12px 16px"
      flexDirection="column"
      gap="8px"
      border="1px solid"
      borderColor="gray.200"
      bg={disabled ? "gray.400" : ""}
      borderRadius="md"
      _hover={disabled ? {} : { bg: "gray.50" }}
      transition="background-color 0.2s"
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="sm" fontWeight="semibold">
          {criteria.criteriaContent}
        </Text>
        <Flex gap="4px">
          {onAddToForm && (
            <IconButton
              size="xs"
              variant="ghost"
              onClick={onAddToForm}
              disabled={disabled}
            >
              <FaPlus />
            </IconButton>
          )}
          {onEdit && (
            <IconButton
              size="xs"
              variant="ghost"
              onClick={() => onEdit(criteria?.criteriaId ?? null)}
            >
              <FaEdit />
            </IconButton>
          )}
          {onDelete && (
            <IconButton
              size="xs"
              variant="ghost"
              colorScheme="red"
              onClick={() => onDelete(criteria?.criteriaId ?? null)}
            >
              <FaTrash />
            </IconButton>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

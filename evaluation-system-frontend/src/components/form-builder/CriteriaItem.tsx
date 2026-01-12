import { Button, Flex, Text } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";

export type Criteria = {
  criteriaId: string;
  criteriaTitle: string;
};

export type CriteriaItemProps = {
  criteria: Criteria;
  onEdit?: () => void;
};

export const CriteriaItem = ({ criteria, onEdit }: CriteriaItemProps) => {
  return (
    <Flex
      cursor="pointer"
      padding="10px 16px"
      alignItems="center"
      justifyContent="space-between"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      _hover={{ bg: "gray.50" }}
    >
      <Text fontSize="sm">{criteria.criteriaTitle}</Text>

      <Button size="xs" variant="ghost" onClick={onEdit}>
        <FaEdit />
      </Button>
    </Flex>
  );
};

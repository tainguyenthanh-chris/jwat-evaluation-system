import { Badge, Card, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa";

export type SectionCriteria = {
  criteriaId: string;
  criteriaTitle: string;
  order: number;
};

export type SectionCriteriaRendererProps = {
  sectionRoles: string[];
  criteria: SectionCriteria;
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
};

export const SectionCriteriaRenderer = ({
  sectionRoles,
  criteria,
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
}: SectionCriteriaRendererProps) => {
  return (
    <Card.Root>
      <Card.Body padding="16px">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex gap="16px">
            <Badge size="sm">{criteria.order}</Badge>
            <Text fontSize="sm" fontWeight="semibold">
              {criteria.criteriaTitle}
            </Text>
          </Flex>

          <Flex gap="16px" flexWrap="wrap">
            <Flex gap="16px">
              {sectionRoles.map((role) => (
                <Input key={role} size="sm" placeholder={role} />
              ))}
            </Flex>
            <Flex gap="4px">
              <IconButton
                size="xs"
                variant="ghost"
                disabled={index === 0}
                onClick={onMoveUp}
              >
                <FaArrowUp />
              </IconButton>

              <IconButton
                size="xs"
                variant="ghost"
                disabled={index === total - 1}
                onClick={onMoveDown}
              >
                <FaArrowDown />
              </IconButton>

              <IconButton
                size="xs"
                variant="ghost"
                colorPalette="red"
                onClick={onRemove}
              >
                <FaTrash />
              </IconButton>
            </Flex>
          </Flex>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

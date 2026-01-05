import { Flex, Text } from "@chakra-ui/react";
import { SectionCriteriaItem } from "./SectionCrIteriaItem";
import type { SectionCriteria } from "../form-section/FormSectionList";

interface SectionCriteriaListProps {
  criteriaList: SectionCriteria[];
  sectionRoles: string[];
  onRemove: (criteriaTempId: string) => void;
  onMoveUp: (criteriaTempId: string) => void;
  onMoveDown: (criteriaTempId: string) => void;
  onUpdateTitle: (criteriaTempId: string, newTitle: string) => void;
}

export const SectionCriteriaList = ({
  criteriaList,
  sectionRoles,
  onRemove,
  onMoveUp,
  onMoveDown,
  onUpdateTitle,
}: SectionCriteriaListProps) => {
  if (criteriaList.length === 0) {
    return (
      <Text fontSize="xs" color="gray.500" textAlign="center" py="12px">
        No criteria added yet.
      </Text>
    );
  }

  return (
    <Flex flexDirection="column" gap="8px">
      {criteriaList.map((criteria, index) => (
        <SectionCriteriaItem
          key={criteria.tempId}
          criteria={criteria}
          sectionRoles={sectionRoles}
          isFirst={index === 0}
          isLast={index === criteriaList.length - 1}
          onMoveUp={() => onMoveUp(criteria.tempId)}
          onMoveDown={() => onMoveDown(criteria.tempId)}
          onRemove={() => onRemove(criteria.tempId)}
          onUpdateTitle={(newTitle) => onUpdateTitle(criteria.tempId, newTitle)}
        />
      ))}
    </Flex>
  );
};

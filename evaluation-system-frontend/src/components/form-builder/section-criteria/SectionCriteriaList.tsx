import { Badge, Card, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCheck,
  FaEdit,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import { useState } from "react";
import type { SectionCriteria } from "../form-section/FormSectionList";

interface SectionCriteriaListProps {
  criteriaList: SectionCriteria[];
  sectionRoles: string[];
  onRemove: (criteriaId: string) => void;
  onMoveUp: (criteriaId: string) => void;
  onMoveDown: (criteriaId: string) => void;
  onUpdateTitle: (criteriaId: string, newTitle: string) => void;
}

export const SectionCriteriaList = ({
  criteriaList,
  sectionRoles,
  onRemove,
  onMoveUp,
  onMoveDown,
  onUpdateTitle,
}: SectionCriteriaListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  if (criteriaList.length === 0) {
    return (
      <Text fontSize="xs" color="gray.500" textAlign="center" py="12px">
        No criteria added yet.
      </Text>
    );
  }

  const startEdit = (criteria: SectionCriteria) => {
    setEditingId(criteria.criteriaId);
    setEditTitle(criteria.criteriaTitle);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const saveEdit = (criteriaId: string) => {
    if (!editTitle.trim()) return;
    onUpdateTitle(criteriaId, editTitle.trim());
    cancelEdit();
  };

  return (
    <Flex flexDirection="column" gap="8px">
      {criteriaList.map((criteria, index) => {
        const isEditing = editingId === criteria.criteriaId;

        return (
          <Card.Root key={criteria.criteriaId}>
            <Card.Body padding="12px">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                gap="16px"
              >
                <Flex gap="12px" alignItems="center" minW="150px">
                  <Badge size="sm" colorPalette="orange">
                    {criteria.order + 1}
                  </Badge>

                  {isEditing ? (
                    <Input
                      size="sm"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Criteria title..."
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(criteria.criteriaId);
                        if (e.key === "Escape") cancelEdit();
                      }}
                    />
                  ) : (
                    <Text fontSize="sm" fontWeight="semibold">
                      {criteria.criteriaTitle}
                    </Text>
                  )}
                </Flex>

                <Flex gap="16px" flexWrap="wrap" alignItems="center">
                  <Flex gap="8px">
                    {sectionRoles.map((role) => (
                      <Input
                        key={role}
                        size="sm"
                        placeholder={role}
                        width="100px"
                      />
                    ))}
                    <Input size="sm" placeholder="FINAL" width="100px" />
                  </Flex>

                  <Flex gap="4px">
                    {isEditing ? (
                      <>
                        <IconButton
                          size="xs"
                          variant="ghost"
                          colorPalette="green"
                          onClick={() => saveEdit(criteria.criteriaId)}
                          disabled={!editTitle.trim()}
                          aria-label="Save"
                        >
                          <FaCheck />
                        </IconButton>
                        <IconButton
                          size="xs"
                          variant="ghost"
                          onClick={cancelEdit}
                          aria-label="Cancel"
                        >
                          <FaTimes />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        size="xs"
                        variant="ghost"
                        onClick={() => startEdit(criteria)}
                        aria-label="Edit"
                      >
                        <FaEdit />
                      </IconButton>
                    )}

                    <IconButton
                      size="xs"
                      variant="ghost"
                      disabled={index === 0}
                      onClick={() => onMoveUp(criteria.criteriaId)}
                      aria-label="Move up"
                    >
                      <FaArrowUp />
                    </IconButton>

                    <IconButton
                      size="xs"
                      variant="ghost"
                      disabled={index === criteriaList.length - 1}
                      onClick={() => onMoveDown(criteria.criteriaId)}
                      aria-label="Move down"
                    >
                      <FaArrowDown />
                    </IconButton>

                    <IconButton
                      size="xs"
                      variant="ghost"
                      colorPalette="red"
                      onClick={() => onRemove(criteria.criteriaId)}
                      aria-label="Remove criteria"
                    >
                      <FaTrash />
                    </IconButton>
                  </Flex>
                </Flex>
              </Flex>
            </Card.Body>
          </Card.Root>
        );
      })}
    </Flex>
  );
};

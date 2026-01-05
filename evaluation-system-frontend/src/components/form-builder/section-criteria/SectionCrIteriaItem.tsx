import { Badge, Card, Flex, IconButton, Input, Text } from "@chakra-ui/react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCheck,
  FaEdit,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import type { SectionCriteria } from "../form-section/FormSectionList";
import { useState } from "react";

interface SectionCriteriaItemProps {
  criteria: SectionCriteria;
  sectionRoles: string[];
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onUpdateTitle: (newTitle: string) => void;
}

export const SectionCriteriaItem = ({
  criteria,
  sectionRoles,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
  onUpdateTitle,
}: SectionCriteriaItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(criteria.criteriaTitle);

  const handleStartEdit = () => {
    setEditTitle(criteria.criteriaTitle);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditTitle(criteria.criteriaTitle);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    onUpdateTitle(editTitle.trim());
    setIsEditing(false);
  };

  return (
    <Card.Root>
      <Card.Body padding="12px">
        <Flex justifyContent="space-between" alignItems="center" gap="16px">
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSaveEdit();
                  if (e.key === "Escape") handleCancelEdit();
                }}
                autoFocus
              />
            ) : (
              <Text fontSize="sm" fontWeight="semibold">
                {criteria.criteriaTitle}
              </Text>
            )}
          </Flex>

          <Flex gap="16px" flexWrap="wrap" alignItems="center">
            <Flex gap="8px">
              {sectionRoles.map((role: string) => (
                <Input key={role} size="sm" placeholder={role} width="100px" />
              ))}

              <Input size="sm" placeholder="FINAL" width="100px"></Input>
            </Flex>

            <Flex gap="4px">
              {isEditing ? (
                <>
                  <IconButton
                    size="xs"
                    variant="ghost"
                    colorPalette="green"
                    onClick={handleSaveEdit}
                    disabled={!editTitle.trim()}
                    aria-label="Save"
                  >
                    <FaCheck />
                  </IconButton>
                  <IconButton
                    size="xs"
                    variant="ghost"
                    onClick={handleCancelEdit}
                    aria-label="Cancel"
                  >
                    <FaTimes />
                  </IconButton>
                </>
              ) : (
                <IconButton
                  size="xs"
                  variant="ghost"
                  onClick={handleStartEdit}
                  aria-label="Edit"
                >
                  <FaEdit />
                </IconButton>
              )}
              <IconButton
                size="xs"
                variant="ghost"
                disabled={isFirst}
                onClick={onMoveUp}
                aria-label="Move up"
              >
                <FaArrowUp />
              </IconButton>
              <IconButton
                size="xs"
                variant="ghost"
                disabled={isLast}
                onClick={onMoveDown}
                aria-label="Move down"
              >
                <FaArrowDown />
              </IconButton>
              <IconButton
                size="xs"
                variant="ghost"
                colorPalette="red"
                onClick={onRemove}
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
};

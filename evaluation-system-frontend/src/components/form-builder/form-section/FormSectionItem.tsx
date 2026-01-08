import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Flex,
  IconButton,
  Input,
  NativeSelect,
  Separator,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  FaArrowDown,
  FaArrowUp,
  FaCheck,
  FaEdit,
  FaPlus,
  FaTimes,
  FaTrash,
} from "react-icons/fa";
import type { FormSection, SectionCriteria } from "./FormSectionList";
import {
  useReviewConfigByCode,
  useReviewConfigs,
} from "../../../context/ReviewConfigContext";

interface FormSectionItemProps {
  formSection: FormSection;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onAddCriteria: (criteria: Omit<SectionCriteria, "order">) => void;
  onUpdateSection: (updates: {
    sectionTitle?: string;
    defaultReviewConfigCode?: string;
    reviewConfigType?: string;
  }) => void;
  onRemoveCriteria: (sectionId: string, criteriaId: string) => void;
  onMoveCriteriaUp: (sectionId: string, criteriaId: string) => void;
  onMoveCriteriaDown: (sectionId: string, criteriaId: string) => void;
  onUpdateCriteriaTitle: (
    sectionId: string,
    criteriaId: string,
    newTitle: string
  ) => void;
  isSelected: boolean;
  onSelect: (section: FormSection) => void;
}

export const FormSectionItem = ({
  formSection,
  isFirst,
  isLast,
  onMoveUp,
  onMoveDown,
  onRemove,
  onAddCriteria,
  onUpdateSection,
  onRemoveCriteria,
  onMoveCriteriaUp,
  onMoveCriteriaDown,
  onUpdateCriteriaTitle,
  isSelected,
  onSelect,
}: FormSectionItemProps) => {
  const config = useReviewConfigByCode(formSection.defaultReviewConfigCode);
  const reviewConfigs = useReviewConfigs();
  const sectionRoles = config?.reviewConfigRoles ?? [];

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(formSection.sectionTitle);
  const [editReviewConfigCode, setEditReviewConfigCode] = useState(
    formSection.defaultReviewConfigCode
  );
  const [newCriteriaTitle, setNewCriteriaTitle] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const handleStartEdit = () => {
    setEditTitle(formSection.sectionTitle);
    setEditReviewConfigCode(formSection.defaultReviewConfigCode);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditTitle(formSection.sectionTitle);
    setEditReviewConfigCode(formSection.defaultReviewConfigCode);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim() || !editReviewConfigCode) return;

    const selectedConfig = reviewConfigs.find(
      (c) => c.reviewConfigCode === editReviewConfigCode
    );
    if (!selectedConfig) return;

    onUpdateSection({
      sectionTitle: editTitle.trim(),
      defaultReviewConfigCode: selectedConfig.reviewConfigCode,
      reviewConfigType: selectedConfig.reviewConfigType,
    });

    setIsEditing(false);
  };

  const handleAddCriteria = () => {
    if (!newCriteriaTitle.trim()) return;

    onAddCriteria({
      sectionId: formSection.sectionId,
      criteriaId: `criteria_${Date.now()}`,
      criteriaTitle: newCriteriaTitle.trim(),
    });

    setNewCriteriaTitle("");
  };

  const startEditCriteria = (criteria: SectionCriteria) => {
    setEditingId(criteria.criteriaId);
    setEditingTitle(criteria.criteriaTitle);
  };

  const cancelEditCriteria = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const saveEditCriteria = (criteriaId: string) => {
    if (!editingTitle.trim()) return;
    onUpdateCriteriaTitle(
      formSection.sectionId,
      criteriaId,
      editingTitle.trim()
    );
    cancelEditCriteria();
  };

  const moveCriteriaUp = (criteriaId: string) =>
    onMoveCriteriaUp(formSection.sectionId, criteriaId);
  const moveCriteriaDown = (criteriaId: string) =>
    onMoveCriteriaDown(formSection.sectionId, criteriaId);
  const removeCriteria = (criteriaId: string) =>
    onRemoveCriteria(formSection.sectionId, criteriaId);

  return (
    <Flex
      flexDirection="column"
      gap="12px"
      border="1px solid"
      borderColor={isSelected ? "blue.400" : "gray.300"}
      borderRadius="md"
      padding="12px"
      bg={isSelected ? "blue.50" : "white"}
      onClick={() => onSelect(formSection)}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap="8px">
          <Badge size="sm" colorPalette="purple">
            {formSection.order + 1}
          </Badge>
          {isEditing ? (
            <Flex gap="8px" flex="1" mr="8px">
              <Input
                size="sm"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Section title..."
              />
              <NativeSelect.Root size="sm">
                <NativeSelect.Field
                  value={editReviewConfigCode}
                  onChange={(e) => setEditReviewConfigCode(e.target.value)}
                >
                  {reviewConfigs.map((c) => (
                    <option key={c.reviewConfigCode} value={c.reviewConfigCode}>
                      {c.reviewConfigCode}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Flex>
          ) : (
            <Text fontWeight="semibold" fontSize="sm">
              {formSection.sectionTitle}
            </Text>
          )}
        </Flex>

        <Flex gap="4px">
          {isEditing ? (
            <>
              <IconButton
                size="xs"
                variant="ghost"
                colorPalette="green"
                onClick={handleSaveEdit}
                disabled={!editTitle.trim() || !editReviewConfigCode}
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
            onClick={onMoveUp}
            disabled={isFirst}
            aria-label="Move up"
          >
            <FaArrowUp />
          </IconButton>
          <IconButton
            size="xs"
            variant="ghost"
            onClick={onMoveDown}
            disabled={isLast}
            aria-label="Move down"
          >
            <FaArrowDown />
          </IconButton>
          <IconButton
            size="xs"
            variant="ghost"
            colorPalette="red"
            onClick={onRemove}
            aria-label="Remove"
          >
            <FaTrash />
          </IconButton>
        </Flex>
      </Flex>

      <Separator />

      <Flex gap="16px" flexWrap="wrap">
        <Flex gap="8px" alignItems="center">
          <Text fontSize="xs" color="gray.500">
            Type:
          </Text>
          <Badge size="sm" colorPalette="blue">
            {formSection.reviewConfigType}
          </Badge>
        </Flex>

        {sectionRoles.length > 0 && (
          <Flex gap="4px" alignItems="center" flexWrap="wrap">
            <Text fontSize="xs" color="gray.500">
              Roles:
            </Text>
            {sectionRoles.map((role, idx) => (
              <Badge key={idx} size="sm" colorPalette="teal" variant="subtle">
                {role}
              </Badge>
            ))}
          </Flex>
        )}
      </Flex>

      {formSection.reviewConfigType === "POINT" && (
        <Flex flexDirection="column" gap="8px">
          <Text fontSize="xs" fontWeight="medium" color="gray.600">
            Criteria
          </Text>

          {formSection.criteriaList.length === 0 && (
            <Text fontSize="xs" color="gray.500" textAlign="center">
              No criteria added yet.
            </Text>
          )}

          {formSection.criteriaList.map((criteria, index) => {
            const isEditingCriteria = editingId === criteria.criteriaId;
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
                      {isEditingCriteria ? (
                        <Input
                          size="sm"
                          value={editingTitle}
                          autoFocus
                          placeholder="Criteria title..."
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              saveEditCriteria(criteria.criteriaId);
                            if (e.key === "Escape") cancelEditCriteria();
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
                        {isEditingCriteria ? (
                          <>
                            <IconButton
                              size="xs"
                              variant="ghost"
                              colorPalette="green"
                              onClick={() =>
                                saveEditCriteria(criteria.criteriaId)
                              }
                              disabled={!editingTitle.trim()}
                              aria-label="Save"
                            >
                              <FaCheck />
                            </IconButton>
                            <IconButton
                              size="xs"
                              variant="ghost"
                              onClick={cancelEditCriteria}
                              aria-label="Cancel"
                            >
                              <FaTimes />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton
                            size="xs"
                            variant="ghost"
                            onClick={() => startEditCriteria(criteria)}
                            aria-label="Edit"
                          >
                            <FaEdit />
                          </IconButton>
                        )}
                        <IconButton
                          size="xs"
                          variant="ghost"
                          disabled={index === 0}
                          onClick={() => moveCriteriaUp(criteria.criteriaId)}
                          aria-label="Move up"
                        >
                          <FaArrowUp />
                        </IconButton>
                        <IconButton
                          size="xs"
                          variant="ghost"
                          disabled={
                            index === formSection.criteriaList.length - 1
                          }
                          onClick={() => moveCriteriaDown(criteria.criteriaId)}
                          aria-label="Move down"
                        >
                          <FaArrowDown />
                        </IconButton>
                        <IconButton
                          size="xs"
                          variant="ghost"
                          colorPalette="red"
                          onClick={() => removeCriteria(criteria.criteriaId)}
                          aria-label="Remove"
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

          <Flex gap="8px">
            <Input
              size="sm"
              placeholder="Enter criteria title..."
              value={newCriteriaTitle}
              onChange={(e) => setNewCriteriaTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddCriteria();
              }}
            />
            <Button
              size="sm"
              colorPalette="blue"
              onClick={handleAddCriteria}
              disabled={!newCriteriaTitle.trim()}
            >
              <FaPlus /> Add
            </Button>
          </Flex>
        </Flex>
      )}

      {formSection.reviewConfigType === "COMMENT" && (
        <Flex flexDirection="column" gap="8px">
          {sectionRoles.map((role) => (
            <Textarea key={role} size="sm" placeholder={role} />
          ))}
        </Flex>
      )}

      {formSection.reviewConfigType === "TARGET" && (
        <>
          <Separator />
          <Text fontSize="sm" color="gray.500" textAlign="center" py="12px">
            Targets will be defined when template is used
          </Text>
        </>
      )}
    </Flex>
  );
};

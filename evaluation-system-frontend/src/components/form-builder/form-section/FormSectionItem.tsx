import { useState } from "react";
import {
  Badge,
  Button,
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
import { SectionCriteriaList } from "../section-criteria/SectionCriteriaList";

interface FormSectionItemProps {
  formSection: FormSection;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  onAddCriteria: (criteria: Omit<SectionCriteria, "order" | "tempId">) => void;
  onUpdateSection: (updates: {
    secTitle?: string;
    defaultRevConfCd?: string;
    revConfType?: string;
  }) => void;
  onRemoveCriteria: (criteriaTempId: string) => void;
  onMoveCriteriaUp: (criteriaTempId: string) => void;
  onMoveCriteriaDown: (criteriaTempId: string) => void;
  onUpdateCriteriaTitle: (criteriaTempId: string, newTitle: string) => void;
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
}: FormSectionItemProps) => {
  const config = useReviewConfigByCode(formSection.defaultRevConfCd);
  const reviewConfigs = useReviewConfigs();
  const sectionRoles = config?.revConfRoles ?? [];
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(formSection.secTitle);
  const [editRevConfCd, setEditRevConfCd] = useState(
    formSection.defaultRevConfCd
  );
  const [newCriteriaTitle, setNewCriteriaTitle] = useState("");

  const handleStartEdit = () => {
    setEditTitle(formSection.secTitle);
    setEditRevConfCd(formSection.defaultRevConfCd);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setEditTitle(formSection.secTitle);
    setEditRevConfCd(formSection.defaultRevConfCd);
    setIsEditing(false);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim() || !editRevConfCd) return;

    const selectedConfig = reviewConfigs.find(
      (config) => config.revConfCd === editRevConfCd
    );

    if (!selectedConfig) return;

    onUpdateSection({
      secTitle: editTitle.trim(),
      defaultRevConfCd: selectedConfig.revConfCd,
      revConfType: selectedConfig.revConfType,
    });

    setIsEditing(false);
  };

  const handleAddCriteria = () => {
    if (!newCriteriaTitle.trim()) return;

    onAddCriteria({
      criteriaId: "",
      criteriaTitle: newCriteriaTitle.trim(),
    });

    setNewCriteriaTitle("");
  };

  return (
    <Flex
      flexDirection="column"
      gap="12px"
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      padding="12px"
      bg="white"
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
                  value={editRevConfCd}
                  onChange={(e) => setEditRevConfCd(e.target.value)}
                >
                  {reviewConfigs.map((c) => (
                    <option key={c.revConfCd} value={c.revConfCd}>
                      {c.revConfCd}
                    </option>
                  ))}
                </NativeSelect.Field>
                <NativeSelect.Indicator />
              </NativeSelect.Root>
            </Flex>
          ) : (
            <Text fontWeight="semibold" fontSize="sm">
              {formSection.secTitle}
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
                disabled={!editTitle.trim() || !editRevConfCd}
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
            aria-label="Remove section"
          >
            <FaTrash />
          </IconButton>
        </Flex>
      </Flex>

      <>
        <Separator />

        <Flex gap="16px" flexWrap="wrap">
          <Flex gap="8px" alignItems="center">
            <Text fontSize="xs" color="gray.500">
              Type:
            </Text>
            <Badge size="sm" colorPalette="blue">
              {formSection.revConfType}
            </Badge>
          </Flex>

          {config?.revConfRoles && config.revConfRoles.length > 0 && (
            <Flex gap="4px" alignItems="center" flexWrap="wrap">
              <Text fontSize="xs" color="gray.500">
                Roles:
              </Text>
              {config.revConfRoles.map((role: string, idx: number) => (
                <Badge key={idx} size="sm" colorPalette="teal" variant="subtle">
                  {role}
                </Badge>
              ))}
            </Flex>
          )}
        </Flex>

        {formSection.revConfType === "POINT" && (
          <>
            <Separator />

            <Flex flexDirection="column" gap="8px">
              <Text fontSize="xs" fontWeight="medium" color="gray.600">
                Criteria
              </Text>

              <SectionCriteriaList
                criteriaList={formSection.criteriaList}
                sectionRoles={config?.revConfRoles ?? []}
                onRemove={onRemoveCriteria}
                onMoveUp={onMoveCriteriaUp}
                onMoveDown={onMoveCriteriaDown}
                onUpdateTitle={onUpdateCriteriaTitle}
              />

              <Flex gap="8px">
                <Input
                  size="sm"
                  placeholder="Enter criteria title..."
                  value={newCriteriaTitle}
                  onChange={(e) => setNewCriteriaTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddCriteria();
                    }
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
          </>
        )}

        {formSection.revConfType === "COMMENT" && (
          <Flex gap="8px" flexDirection="column">
            {sectionRoles.map((role: string) => (
              <Textarea key={role} size="sm" placeholder={role} />
            ))}
          </Flex>
        )}

        {formSection.revConfType === "TARGET" && (
          <>
            <Separator />
            <Text fontSize="sm" color="gray.500" textAlign="center" py="12px">
              Targets will be defined when template is used
            </Text>
          </>
        )}
      </>
    </Flex>
  );
};

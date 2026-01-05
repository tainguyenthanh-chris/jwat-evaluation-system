import { Badge, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
// import { departments, positions } from "./sectionDialogs";

export interface Section {
  defaultRevConfCd: string;
  revConfType: string;
  secId: string;
  secTitle: string;
  cueList: { cueCd: string }[];
}

export interface SectionItemProps {
  section: Section;
  onEdit: (sectionId: string) => void;
  onDelete: (sectionId: string) => void;
  onAddToForm: () => void;
}

// const getDepartmentName = (deptId: string): string => {
//   const dept = departments.find((department) => department.deptId === deptId);
//   return dept?.deptNm || deptId;
// };

// const getPositionName = (posId: string): string => {
//   const pos = positions.find((position) => position.posId === posId);
//   return pos?.posNm || posId;
// };

export const SectionItem = ({
  section,
  onEdit,
  onDelete,
  onAddToForm,
}: SectionItemProps) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(section.secId);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(section.secId);
  };

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
          {section.secTitle}
        </Text>
        <Flex gap="4px">
          {onAddToForm && (
            <IconButton size="xs" variant="ghost" onClick={onAddToForm}>
              <FaPlus />
            </IconButton>
          )}
          <Button
            size="xs"
            variant="ghost"
            onClick={handleEdit}
            aria-label={`Edit ${section.secTitle}`}
          >
            <FaEdit />
          </Button>
          <Button
            size="xs"
            variant="ghost"
            colorPalette="red"
            onClick={handleDelete}
            aria-label={`Delete ${section.secTitle}`}
          >
            <FaTrash />
          </Button>
        </Flex>
      </Flex>

      <Flex gap="8px" alignItems="center" flexWrap="wrap">
        <Badge size="sm" colorPalette="blue">
          {section.revConfType}
        </Badge>
        <Text fontSize="xs" color="text.muted">
          {section.defaultRevConfCd}
        </Text>
      </Flex>

      {section.cueList.length === 0 && (
        <Badge
          size="sm"
          colorPalette={"gray"}
          variant="subtle"
          alignSelf="flex-start"
        >
          Common
        </Badge>
      )}

      {section.cueList.length > 0 && (
        <Flex direction="column" gap="4px">
          <Text fontSize="xs" fontWeight="semibold" color="text.muted">
            Cues ({section.cueList.length}):
          </Text>
          <Flex gap="4px" flexWrap="wrap">
            {section.cueList.map((cue, index) => {
              return (
                <Badge
                  key={`${cue.cueCd}-${index}`}
                  size="sm"
                  colorPalette="gray"
                  variant="subtle"
                >
                  {cue.cueCd}
                </Badge>
              );
            })}
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

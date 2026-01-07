import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FormSectionItem } from "./FormSectionItem";
export type SectionCriteria = {
  order: number;
  tempId: string;
  criteriaId: string;
  criteriaTitle: string;
};

export type FormSection = {
  order: number;
  tempId: string;
  secId: string;
  secTitle: string;
  revConfType: string;
  defaultRevConfCd: string;
  criteriaList: SectionCriteria[];
};

export interface FormSectionHandler {
  addSection: (
    section: Omit<FormSection, "order" | "tempId" | "criteriaList">
  ) => void;
  updateSection: (
    tempId: string,
    updates: {
      secTitle?: string;
      defaultRevConfCd?: string;
      revConfType?: string;
    }
  ) => void;
  removeSection: (tempId: string) => void;
  moveSectionUp: (tempId: string) => void;
  moveSectionDown: (tempId: string) => void;
  getSections: () => FormSection[];
  clearSections: () => void;
}

export const FormSectionList = forwardRef<FormSectionHandler, {}>(
  (_props, ref) => {
    const [formSections, setFormSections] = useState<FormSection[]>([]);

    useEffect(() => {
      console.log(formSections);
    }, [formSections]);

    const handleMoveSectionUp = (tempId: string) => {
      const index = formSections.findIndex(
        (section) => section.tempId === tempId
      );
      if (index <= 0) return;

      const newSections = [...formSections];
      [newSections[index - 1], newSections[index]] = [
        newSections[index],
        newSections[index - 1],
      ];
      setFormSections(
        newSections.map((section, i) => ({ ...section, order: i }))
      );
    };

    const handleMoveSectionDown = (tempId: string) => {
      const index = formSections.findIndex(
        (section) => section.tempId === tempId
      );
      if (index === -1 || index >= formSections.length - 1) return;

      const newSections = [...formSections];
      [newSections[index], newSections[index + 1]] = [
        newSections[index + 1],
        newSections[index],
      ];
      setFormSections(
        newSections.map((section, i) => ({ ...section, order: i }))
      );
    };

    const handleAddSection = (
      section: Omit<FormSection, "order" | "tempId" | "criteriaList">
    ) => {
      setFormSections((prev) => {
        return [
          ...prev,
          {
            ...section,
            tempId: `section${Date.now()}`,
            order: prev.length,
            criteriaList: [],
          },
        ];
      });
    };

    const handleRemoveSection = (tempId: string) => {
      const filtered = formSections.filter(
        (section) => section.tempId !== tempId
      );
      setFormSections(
        filtered.map((section, index) => ({ ...section, order: index }))
      );
    };

    const handleUpdateSection = (
      tempId: string,
      updates: {
        secTitle?: string;
        defaultRevConfCd?: string;
        revConfType?: string;
      }
    ) => {
      setFormSections((prev) =>
        prev.map((section) => {
          if (section.tempId !== tempId) return section;
          const updated = { ...section, ...updates };
          if (
            updates.revConfType &&
            updates.revConfType !== "POINT" &&
            section.revConfType === "POINT"
          ) {
            updated.criteriaList = [];
          }

          return updated;
        })
      );
    };

    const handleGetSections = (): FormSection[] => {
      return formSections;
    };

    const handleClearSections = () => {
      setFormSections([]);
    };

    const handleAddCriteria = (
      sectionTempId: string,
      criteria: Omit<SectionCriteria, "order" | "tempId">
    ) => {
      setFormSections((prev) =>
        prev.map((section) => {
          if (section.tempId !== sectionTempId) return section;
          return {
            ...section,
            criteriaList: [
              ...section.criteriaList,
              {
                ...criteria,
                tempId: `criteria${Date.now()}`,
                order: section.criteriaList.length,
              },
            ],
          };
        })
      );
    };

    const handleRemoveCriteria = (
      sectionTempId: string,
      criteriaTempId: string
    ) => {
      setFormSections((prev) =>
        prev.map((section) => {
          if (section.tempId !== sectionTempId) return section;
          const filtered = section.criteriaList.filter(
            (criteria) => criteria.tempId !== criteriaTempId
          );
          return {
            ...section,
            criteriaList: filtered.map((criteria, index) => ({
              ...criteria,
              order: index,
            })),
          };
        })
      );
    };

    const handleMoveCriteriaUp = (
      sectionTempId: string,
      criteriaTempId: string
    ) => {
      setFormSections((prev) =>
        prev.map((section) => {
          if (section.tempId !== sectionTempId) return section;

          const index = section.criteriaList.findIndex(
            (criteria) => criteria.tempId === criteriaTempId
          );
          if (index <= 0) return section;

          const newList = [...section.criteriaList];
          [newList[index - 1], newList[index]] = [
            newList[index],
            newList[index - 1],
          ];
          return {
            ...section,
            criteriaList: newList.map((criteria, i) => ({
              ...criteria,
              order: i,
            })),
          };
        })
      );
    };

    const handleMoveCriteriaDown = (
      sectionTempId: string,
      criteriaTempId: string
    ) => {
      setFormSections((prev) =>
        prev.map((section) => {
          if (section.tempId !== sectionTempId) return section;

          const index = section.criteriaList.findIndex(
            (criteria) => criteria.tempId === criteriaTempId
          );
          if (index === -1 || index >= section.criteriaList.length - 1)
            return section;

          const newList = [...section.criteriaList];
          [newList[index], newList[index + 1]] = [
            newList[index + 1],
            newList[index],
          ];
          return {
            ...section,
            criteriaList: newList.map((criteria, i) => ({
              ...criteria,
              order: i,
            })),
          };
        })
      );
    };

    const handleUpdateCriteriaTitle = (
      sectionTempId: string,
      criteriaTempId: string,
      newTitle: string
    ) => {
      setFormSections((prev) =>
        prev.map((section) => {
          if (section.tempId !== sectionTempId) return section;
          return {
            ...section,
            criteriaList: section.criteriaList.map((criteria) =>
              criteria.tempId === criteriaTempId
                ? { ...criteria, criteriaTitle: newTitle }
                : criteria
            ),
          };
        })
      );
    };

    useImperativeHandle(ref, () => ({
      addSection: handleAddSection,
      updateSection: handleUpdateSection,
      removeSection: handleRemoveSection,
      moveSectionUp: handleMoveSectionUp,
      moveSectionDown: handleMoveSectionDown,
      getSections: handleGetSections,
      clearSections: handleClearSections,
    }));

    return (
      <Flex flexDirection="column" gap="12px">
        {formSections.length === 0 ? (
          <Text fontSize="sm" color="gray.500" textAlign="center" py="20px">
            No sections added yet
          </Text>
        ) : (
          formSections.map((section, index) => (
            <FormSectionItem
              key={section.tempId}
              formSection={section}
              isFirst={index === 0}
              isLast={index === formSections.length - 1}
              onMoveUp={() => handleMoveSectionUp(section.tempId)}
              onMoveDown={() => handleMoveSectionDown(section.tempId)}
              onRemove={() => handleRemoveSection(section.tempId)}
              onUpdateSection={(updates) =>
                handleUpdateSection(section.tempId, updates)
              }
              onAddCriteria={(criteria) =>
                handleAddCriteria(section.tempId, criteria)
              }
              onRemoveCriteria={(criteriaTempId) =>
                handleRemoveCriteria(section.tempId, criteriaTempId)
              }
              onMoveCriteriaUp={(criteriaTempId) =>
                handleMoveCriteriaUp(section.tempId, criteriaTempId)
              }
              onMoveCriteriaDown={(criteriaTempId) =>
                handleMoveCriteriaDown(section.tempId, criteriaTempId)
              }
              onUpdateCriteriaTitle={(criteriaTempId, newTitle) =>
                handleUpdateCriteriaTitle(
                  section.tempId,
                  criteriaTempId,
                  newTitle
                )
              }
            />
          ))
        )}
      </Flex>
    );
  }
);

import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FormSectionItem } from "./FormSectionItem";
import { toaster } from "../../ui/toaster";
import type { SelectionContextRef } from "../../../adminPages/adminEmployeePage/form/FormBuilderPage";
import type { Criteria } from "../../../types/criteria";

export type SectionCriteria = {
  order: number;
  sectionId: string;
  criteriaId: string;
  criteriaTitle: string;
};

export type FormSection = {
  order: number;
  sectionId: string;
  sectionTitle: string;
  reviewConfigType: string;
  defaultReviewConfigCode: string;
  criteriaList: SectionCriteria[];
};

export interface FormSectionHandler {
  addSection: (section: Omit<FormSection, "order" | "criteriaList">) => void;
  updateSection: (
    sectionId: string,
    updates: {
      sectionTitle?: string;
      defaultReviewConfigCode?: string;
      reviewConfigType?: string;
    }
  ) => void;
  removeSection: (sectionId: string) => void;
  moveSectionUp: (sectionId: string) => void;
  moveSectionDown: (sectionId: string) => void;
  getSections: () => FormSection[];
  clearSections: () => void;
  getSelectedSection: () => FormSection | null;
  addCriteria: (criteria: Partial<Criteria>) => void;
}

export interface FormSectionListProps {
  selectionCtxRef: React.RefObject<SelectionContextRef>;
  onSectionSelected?: () => void;
}

export const FormSectionList = forwardRef<
  FormSectionHandler,
  FormSectionListProps
>(({ selectionCtxRef, onSectionSelected }, ref) => {
  const [formSections, setFormSections] = useState<FormSection[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    null
  );

  const handleMoveSectionUp = (sectionId: string) => {
    const index = formSections.findIndex(
      (section) => section.sectionId === sectionId
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

  const handleMoveSectionDown = (sectionId: string) => {
    const index = formSections.findIndex(
      (section) => section.sectionId === sectionId
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
    section: Omit<FormSection, "order" | "criteriaList">
  ) => {
    const duplicateId = formSections.some(
      (s) => s.sectionId === section.sectionId
    );

    const duplicateTitle = formSections.some(
      (s) =>
        s.sectionTitle.toLowerCase().trim() ===
        section.sectionTitle.toLowerCase().trim()
    );

    if (duplicateId || duplicateTitle) {
      toaster.create({
        description: "Section already exists in form",
        type: "error",
      });

      return;
    }

    setFormSections((prev) => {
      return [
        ...prev,
        {
          ...section,
          order: prev.length,
          criteriaList: [],
        },
      ];
    });
  };

  const handleRemoveSection = (sectionId: string) => {
    const filtered = formSections.filter(
      (section) => section.sectionId !== sectionId
    );
    setFormSections(
      filtered.map((section, index) => ({ ...section, order: index }))
    );
    setSelectedSectionId((prev) => (prev === sectionId ? null : prev));
  };

  const handleUpdateSection = (
    sectionId: string,
    updates: {
      sectionTitle?: string;
      defaultReviewConfigCode?: string;
      reviewConfigType?: string;
    }
  ) => {
    if (updates.sectionTitle) {
      const duplicateTitle = formSections.some(
        (s) =>
          s.sectionId !== sectionId &&
          s.sectionTitle.toLocaleLowerCase().trim() ===
            updates.sectionTitle?.toLocaleLowerCase().trim()
      );

      if (duplicateTitle) {
        toaster.create({
          description: "Section name already exists",
          type: "error",
        });

        return;
      }
    }
    setFormSections((prev) =>
      prev.map((section) => {
        if (section.sectionId !== sectionId) return section;
        const updated = { ...section, ...updates };
        if (
          updates.reviewConfigType &&
          updates.reviewConfigType !== "POINT" &&
          section.reviewConfigType === "POINT"
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

  // use with type Criteria in type/criteria
  const handleAddCriteriaSecondary = (criteria: Partial<Criteria>) => {
    const sectionId = criteria.sectionId;
    if (!sectionId) return;

    setFormSections((prev) =>
      prev.map((section) => {
        if (section.sectionId !== sectionId) return section;

        const newCriteria = criteriaToSectionCriteria(
          criteria,
          section.criteriaList.length
        );

        if (!newCriteria) return section;

        return {
          ...section,
          criteriaList: [...section.criteriaList, newCriteria],
        };
      })
    );
  };

  const criteriaToSectionCriteria = (
    criteria: Partial<Criteria>,
    order: number
  ): SectionCriteria | null => {
    if (!criteria.sectionId || !criteria.criteriaContent) {
      return null;
    }

    return {
      criteriaId: criteria.formDetailId ?? `criteria-${Date.now()}`,
      criteriaTitle: criteria.criteriaContent,
      sectionId: criteria.sectionId,
      order,
    };
  };

  const handleAddCriteria = (
    sectionId: string,
    criteria: Omit<SectionCriteria, "order">
  ) => {
    setFormSections((prev) =>
      prev.map((section) => {
        if (section.sectionId !== sectionId) return section;
        return {
          ...section,
          criteriaList: [
            ...section.criteriaList,
            {
              ...criteria,
              criteriaId: `criteria${Date.now()}`,
              sectionId: section.sectionId,
              order: section.criteriaList.length,
            },
          ],
        };
      })
    );
  };

  const handleRemoveCriteria = (sectionId: string, criteriaId: string) => {
    setFormSections((prev) =>
      prev.map((section) => {
        if (section.sectionId !== sectionId) return section;
        const filtered = section.criteriaList.filter(
          (criteria) => criteria.criteriaId !== criteriaId
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

  const handleMoveCriteriaUp = (sectionId: string, criteriaId: string) => {
    setFormSections((prev) =>
      prev.map((section) => {
        if (section.sectionId !== sectionId) return section;

        const index = section.criteriaList.findIndex(
          (criteria) => criteria.criteriaId === criteriaId
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

  const handleMoveCriteriaDown = (sectionId: string, criteriaId: string) => {
    setFormSections((prev) =>
      prev.map((section) => {
        if (section.sectionId !== sectionId) return section;

        const index = section.criteriaList.findIndex(
          (criteria) => criteria.criteriaId === criteriaId
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
    sectionId: string,
    criteriaId: string,
    newTitle: string
  ) => {
    setFormSections((prev) =>
      prev.map((section) => {
        if (section.sectionId !== sectionId) return section;
        return {
          ...section,
          criteriaList: section.criteriaList.map((criteria) =>
            criteria.criteriaId === criteriaId
              ? { ...criteria, criteriaTitle: newTitle }
              : criteria
          ),
        };
      })
    );
  };

  const selectedSectionIdRef = selectionCtxRef.current?.selectedSectionIdRef;

  const handleSelectSection = (section: FormSection) => {
    setSelectedSectionId((prev) =>
      prev === section.sectionId ? null : section.sectionId
    );
    if (selectedSectionIdRef) {
      selectedSectionIdRef.current = section.sectionId;
    }
    onSectionSelected?.();
  };

  const handleGetSelectedSection = (): FormSection | null => {
    console.log(true);
    return formSections.find((s) => s.sectionId === selectedSectionId) ?? null;
  };

  useImperativeHandle(ref, () => ({
    addSection: handleAddSection,
    updateSection: handleUpdateSection,
    removeSection: handleRemoveSection,
    moveSectionUp: handleMoveSectionUp,
    moveSectionDown: handleMoveSectionDown,
    getSections: handleGetSections,
    clearSections: handleClearSections,
    getSelectedSection: handleGetSelectedSection,
    addCriteria: handleAddCriteriaSecondary,
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
            key={section.sectionId}
            formSection={section}
            isFirst={index === 0}
            isLast={index === formSections.length - 1}
            onMoveUp={() => handleMoveSectionUp(section.sectionId)}
            onMoveDown={() => handleMoveSectionDown(section.sectionId)}
            onRemove={() => handleRemoveSection(section.sectionId)}
            onUpdateSection={(updates) =>
              handleUpdateSection(section.sectionId, updates)
            }
            onAddCriteria={(criteria) =>
              handleAddCriteria(section.sectionId, criteria)
            }
            onRemoveCriteria={(sectionId, criteriaId) =>
              handleRemoveCriteria(sectionId, criteriaId)
            }
            onMoveCriteriaUp={(sectionId, criteriaId) =>
              handleMoveCriteriaUp(sectionId, criteriaId)
            }
            onMoveCriteriaDown={(sectionId, criteriaId) =>
              handleMoveCriteriaDown(sectionId, criteriaId)
            }
            onUpdateCriteriaTitle={(sectionId, criteriaId, newTitle) =>
              handleUpdateCriteriaTitle(sectionId, criteriaId, newTitle)
            }
            isSelected={selectedSectionId === section.sectionId}
            onSelect={handleSelectSection}
          />
        ))
      )}
    </Flex>
  );
});

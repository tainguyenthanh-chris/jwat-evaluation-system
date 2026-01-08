import { Card, Flex, Spinner, Text } from "@chakra-ui/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { Criteria } from "../../../types/criteria";
import { CriteriaItem } from "./CriteriaItem";

export interface CriteriaListHandle {
  //   getSection: (criteriaId: string) => Criteria | undefined;
  //   updateOrder: (meta: {
  //     departmentCode: string;
  //     positionCode: string;
  //     levelCode: string;
  //   }) => void;
}

// export interface updateNewSection {
//   sectionTitle: string;
//   defaultReviewConfigCode: string;
//   departmentCode: string;
//   positionCode: string;
// }

interface CriteriaListProps {
  onAddToForm?: (criteria: Partial<Criteria>) => void;
  criteriaList: Partial<Criteria>[];
}

export const CriteriaList = forwardRef<CriteriaListHandle, CriteriaListProps>(
  ({ onAddToForm, criteriaList }, ref) => {
    // const [criteriaList, setCriteriaList] = useState<Partial<Criteria>[]>([]);
    // const updateDialogRef = useRef<UpdateSectionDialogRef>(null);
    // const deleteDialogRef = useRef<DeleteSectionDialogRef>(null);
    const [addedCriteriaIdList, setAddedCriteriaIdList] = useState<string[]>(
      []
    );

    const handleAddToForm = (criteria: Partial<Criteria>) => {
      const id = criteria.criteriaId;
      if (!id) return;
      setAddedCriteriaIdList((prev) => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      });

      onAddToForm?.(criteria);
    };

    // useEffect(() => {
    //   console.log("addedCriteriaIdList: " + addedCriteriaIdList);
    // }, [addedCriteriaIdList]);

    return (
      <>
        <Card.Root>
          <Card.Body maxHeight="480px" overflowY="auto" padding="16px">
            <Flex direction="column" gap="8px">
              {criteriaList.length === 0 ? (
                <Text p="12px" fontSize="sm" color="text.muted">
                  No sections found
                </Text>
              ) : (
                criteriaList.map((criteria, index) => (
                  <CriteriaItem
                    key={index}
                    criteria={criteria}
                    onAddToForm={() => handleAddToForm(criteria)}
                    disabled={addedCriteriaIdList.includes(
                      criteria.criteriaId ?? ""
                    )}
                    // onEdit={() =>
                    //   updateDialogRef.current?.open(criteria.criteriaId)
                    // }
                    // onDelete={() =>
                    //   deleteDialogRef.current?.open(criteria.criteriaId)
                    // }
                  />
                ))
              )}
            </Flex>
          </Card.Body>
        </Card.Root>
        {/* <UpdateSectionDialog
          ref={updateDialogRef}
          onSubmit={async (sectionId, data) => {
            await updateMutation.mutateAsync({ sectionId, data });
          }}
          getSection={getSection}
        />

        <DeleteSectionDialog
          ref={deleteDialogRef}
          onSubmit={async (sectionId) => {
            await deleteMutation.mutateAsync(sectionId);
          }}
          getSection={getSection}
        /> */}
      </>
    );
  }
);

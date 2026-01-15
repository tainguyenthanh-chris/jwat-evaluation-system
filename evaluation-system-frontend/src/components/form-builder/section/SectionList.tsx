import { Card, Flex, Spinner, Text } from "@chakra-ui/react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SectionItem, type Section } from "./SectionItem";
import { axiosInstant, type ApiResponse } from "../../../lib/axios";
import {
  DeleteSectionDialog,
  UpdateSectionDialog,
  type DeleteSectionDialogRef,
  type UpdateSectionDialogRef,
} from "./SectionDialogs";
import { queryClient } from "../../../lib/queryClient";
import { toaster } from "../../ui/toaster";
import { useSection, type SectionQuery } from "../../../hooks/useSection";

export interface SectionListHandle {
  getSection: (sectionId: string) => Section | undefined;
  updateOrder: (meta: {
    departmentCode: string;
    positionCode: string;
    levelCode: string;
  }) => void;
}

export interface updateNewSection {
  sectionTitle: string;
  defaultReviewConfigCode: string;
  departmentCode: string;
  positionCode: string;
}

interface SectionListProps {
  onAddToForm: (section: Section) => void;
}

export const SectionList = forwardRef<SectionListHandle, SectionListProps>(
  ({ onAddToForm }, ref) => {
    const [sectionsState, setSectionsState] = useState<Section[]>([]);
    const updateDialogRef = useRef<UpdateSectionDialogRef>(null);
    const deleteDialogRef = useRef<DeleteSectionDialogRef>(null);
    const sectionQuery: SectionQuery = {};
    const {
      data: sections = [],
      isLoading,
      isError,
      error,
    } = useSection(sectionQuery);

    useEffect(() => {
      if (sections) {
        setSectionsState(sections);
      }
    }, [sections]);

    const updateMutation = useMutation({
      mutationFn: async ({
        sectionId,
        data,
      }: {
        sectionId: string;
        data: updateNewSection;
      }) => {
        const response = await axiosInstant.put<ApiResponse<Section>>(
          `/section/${sectionId}`,
          data
        );
        return response.data;
      },
      onSuccess: (response) => {
        setSectionsState((prev) =>
          prev.map((s) =>
            s.sectionId === response.data.sectionId ? response.data : s
          )
        );
        // queryClient.invalidateQueries({ queryKey: ["sections"] });
        toaster.create({
          description: response.message || "Section updated successfully",
          type: "success",
        });
      },
    });

    const deleteMutation = useMutation({
      mutationFn: async (sectionId: string) => {
        const response = await axiosInstant.delete<ApiResponse<void>>(
          `/section/${sectionId}`
        );
        return response.data;
      },
      onSuccess: (response, sectionId) => {
        setSectionsState((prev) =>
          prev.filter((s) => s.sectionId !== sectionId)
        );
        // queryClient.invalidateQueries({ queryKey: ["sections"] });
        toaster.create({
          description: response.message || "Section deleted successfully",
          type: "success",
        });
      },
    });

    const updateOrder = (meta: {
      departmentCode: string;
      positionCode: string;
      levelCode: string;
    }) => {
      const newOrder = [...sectionsState].sort((a, b) => {
        const score = (section: Section) => {
          let s = 0;
          if (section.cueList.some((c) => c.cueCd === meta.departmentCode))
            s += 1;
          if (section.cueList.some((c) => c.cueCd === meta.positionCode))
            s += 1;
          if (section.cueList.some((c) => c.cueCd === meta.levelCode)) s += 1;
          return s;
        };
        return score(b) - score(a);
      });

      setSectionsState(newOrder);
    };

    const getSection = (sectionId: string) =>
      sectionsState.find((section) => section.sectionId === sectionId);

    useImperativeHandle(ref, () => ({
      getSection,
      updateOrder,
    }));

    return (
      <>
        <Card.Root>
          <Card.Body maxHeight="480px" overflowY="auto" padding="16px">
            {isLoading && (
              <Flex justify="center" py="20px">
                <Spinner size="sm" />
              </Flex>
            )}

            {isError && (
              <Text p="12px" fontSize="sm" color="red.500">
                {error?.message || "Failed to load sections"}
              </Text>
            )}

            {!isLoading && !isError && (
              <Flex direction="column" gap="8px">
                {sectionsState.length === 0 ? (
                  <Text p="12px" fontSize="sm" color="text.muted">
                    No sections found
                  </Text>
                ) : (
                  sectionsState.map((section) => (
                    <SectionItem
                      key={section.sectionId}
                      section={section}
                      onAddToForm={() => onAddToForm(section)}
                      onEdit={() =>
                        updateDialogRef.current?.open(section.sectionId)
                      }
                      onDelete={() =>
                        deleteDialogRef.current?.open(section.sectionId)
                      }
                    />
                  ))
                )}
              </Flex>
            )}
          </Card.Body>
        </Card.Root>
        <UpdateSectionDialog
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
        />
      </>
    );
  }
);

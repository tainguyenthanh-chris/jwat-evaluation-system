import { Card, Flex, Spinner, Text } from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SectionItem, type Section } from "./SectionItem";
import {
  CreateNewSectionDialog,
  UpdateSectionDialog,
  DeleteSectionDialog,
  type CreateNewSectionDialogRef,
  type UpdateSectionDialogRef,
  type DeleteSectionDialogRef,
} from "./sectionDialogs";
import { axiosInstant, type ApiResponse } from "../../../lib/axios";
import { toaster } from "../../ui/toaster";

export interface CreateNewSection {
  secTitle: string;
  defaultRevConfCd: string;
  deptCd: string;
  posCd: string;
}

export interface SectionListHandle {
  setSearch: (value: string) => void;
  getSection: (sectionId: string) => Section | undefined;
  openCreateDialog: () => void;
  openEditDialog: (sectionId: string) => void;
  openDeleteDialog: (sectionId: string) => void;
}

interface SectionListProps {
  onAddToForm: (section: Section) => void;
}

export const SectionList = forwardRef<SectionListHandle, SectionListProps>(
  ({ onAddToForm }, ref) => {
    const queryClient = useQueryClient();
    const createDialogRef = useRef<CreateNewSectionDialogRef>(null);
    const updateDialogRef = useRef<UpdateSectionDialogRef>(null);
    const deleteDialogRef = useRef<DeleteSectionDialogRef>(null);
    const [search, setSearch] = useState("");

    const {
      data: sections = [],
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["sections", { search }],
      queryFn: async () => {
        const response = await axiosInstant.get<ApiResponse<Section[]>>(
          "/section",
          {
            params: { search: search || undefined },
          }
        );
        return response.data.data;
      },
    });

    const createMutation = useMutation({
      mutationFn: async (data: CreateNewSection) => {
        const response = await axiosInstant.post<ApiResponse<Section>>(
          "/section",
          data
        );
        return response.data;
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["sections"] });
        toaster.create({
          description: response.message || "Section created successfully",
          type: "success",
        });
      },
    });

    const updateMutation = useMutation({
      mutationFn: async ({
        secId,
        data,
      }: {
        secId: string;
        data: CreateNewSection;
      }) => {
        const response = await axiosInstant.put<ApiResponse<Section>>(
          `/section/${secId}`,
          data
        );
        return response.data;
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["sections"] });
        toaster.create({
          description: response.message || "Section updated successfully",
          type: "success",
        });
      },
    });

    const deleteMutation = useMutation({
      mutationFn: async (secId: string) => {
        const response = await axiosInstant.delete<ApiResponse<void>>(
          `/section/${secId}`
        );
        return response.data;
      },
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["sections"] });
        toaster.create({
          description: response.message || "Section deleted successfully",
          type: "success",
        });
      },
    });

    const getSection = (sectionId: string) =>
      sections.find((section) => section.secId === sectionId);

    useImperativeHandle(ref, () => ({
      setSearch,
      getSection,
      openCreateDialog: () => createDialogRef.current?.open(),
      openEditDialog: (id: string) => updateDialogRef.current?.open(id),
      openDeleteDialog: (id: string) => deleteDialogRef.current?.open(id),
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
                {sections.length === 0 ? (
                  <Text p="12px" fontSize="sm" color="text.muted">
                    {search
                      ? "No sections match your search"
                      : "No sections found"}
                  </Text>
                ) : (
                  sections.map((section) => (
                    <SectionItem
                      key={section.secId}
                      section={section}
                      onEdit={() =>
                        updateDialogRef.current?.open(section.secId)
                      }
                      onDelete={() =>
                        deleteDialogRef.current?.open(section.secId)
                      }
                      onAddToForm={() => onAddToForm(section)}
                    />
                  ))
                )}
              </Flex>
            )}
          </Card.Body>
        </Card.Root>

        <CreateNewSectionDialog
          ref={createDialogRef}
          onSubmit={async (data) => {
            await createMutation.mutateAsync(data);
          }}
          getSection={getSection}
        />

        <UpdateSectionDialog
          ref={updateDialogRef}
          onSubmit={async (secId, data) => {
            await updateMutation.mutateAsync({ secId, data });
          }}
          getSection={getSection}
        />

        <DeleteSectionDialog
          ref={deleteDialogRef}
          onSubmit={async (secId) => {
            await deleteMutation.mutateAsync(secId);
          }}
          getSection={getSection}
        />
      </>
    );
  }
);

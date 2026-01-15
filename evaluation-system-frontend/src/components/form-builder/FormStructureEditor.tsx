import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  Input,
  NativeSelect,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import {
  FormSectionList,
  type FormSection,
  type FormSectionHandler,
} from "./form-section/FormSectionList";
import { useMutation } from "@tanstack/react-query";
import { axiosInstant } from "../../lib/axios";
import { toaster } from "../ui/toaster";
import { queryClient } from "../../lib/queryClient";
import { useReviewConfigs } from "../../context/ReviewConfigContext";
import type { SelectionContextRef } from "../../adminPages/form/FormBuilderPage";
import type { Criteria } from "../../types/criteria";
import SelectOrCreateInput, { type SelectOption } from "../SelectOrCreateInput";
import { useSection, type SectionQuery } from "../../hooks/useSection";
import type { Section } from "./section/SectionItem";

type AddSectionForm = {
  sectionTitle: string;
  reviewConfigCode: string;
  departmentCode: string;
  positionCode: string;
};

export interface FormStructureEditorHandler {
  validate: () => Promise<boolean>;
  addSection: (section: Omit<FormSection, "order" | "criteriaList">) => void;
  getSections: () => FormSection[];
  clearSections: () => void;
  getSelectedSection: () => FormSection | null;
  addCriteria: (criteria: Partial<Criteria>) => void;
}

export interface FormStructureEditorProps {
  getFormMeta: () =>
    | { departmentCode: string; positionCode: string }
    | undefined;
  selectionCtxRef: React.RefObject<SelectionContextRef>;
  onSectionSelected?: () => void;
}

export const FormStructureEditor = forwardRef<
  FormStructureEditorHandler,
  FormStructureEditorProps
>(({ getFormMeta, selectionCtxRef, onSectionSelected }, ref) => {
  const formSectionRef = useRef<FormSectionHandler>(null);
  const [error, setError] = useState<string | null>(null);

  const reviewConfigs = useReviewConfigs();
  const isLoading = !reviewConfigs || reviewConfigs.length === 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddSectionForm>({
    defaultValues: {
      reviewConfigCode: "POINT_SELF_LEADER",
    },
  });

  const createSectionMutation = useMutation({
    mutationFn: async (data: AddSectionForm) => {
      const meta = getFormMeta?.();
      const payload = {
        sectionTitle: data.sectionTitle,
        defaultReviewConfigCode: data.reviewConfigCode,
        departmentCode: meta?.departmentCode || "",
        positionCode: meta?.positionCode || "",
      };

      const response = await axiosInstant.post("/section", payload);
      return response.data;
    },
    onSuccess: (response) => {
      if (response.data) {
        formSectionRef.current?.addSection({
          sectionId: response.data.sectionId,
          sectionTitle: response.data.sectionTitle,
          reviewConfigType: response.data.reviewConfigType,
          defaultReviewConfigCode: response.data.defaultReviewConfigCode,
        });

        queryClient.invalidateQueries({ queryKey: ["sections"] });
      }
      toaster.create({
        description: response.message || "Section created and added to form",
        type: "success",
      });

      reset();
    },
  });

  const handleAddNewSection = (data: AddSectionForm) => {
    createSectionMutation.mutate(data);
  };

  useImperativeHandle(ref, () => ({
    addSection: (section) => formSectionRef.current?.addSection(section),
    getSections: () => formSectionRef.current?.getSections() ?? [],
    clearSections: () => formSectionRef.current?.clearSections(),
    getSelectedSection: () =>
      formSectionRef.current?.getSelectedSection() ?? null,

    validate: async () => {
      const sections = formSectionRef.current?.getSections() ?? [];
      console.log(sections);

      if (sections.length === 0) {
        setError("Form must have at least 1 section");
        return false;
      }

      const invalidPointSection = sections.find(
        (s) =>
          s.reviewConfigType === "POINT" &&
          (!s.criteriaList || s.criteriaList.length === 0)
      );

      if (invalidPointSection) {
        setError("Point section must have at least 1 criteria");
        return false;
      }

      setError(null);
      return true;
    },
    addCriteria: (criteria) => formSectionRef.current?.addCriteria(criteria),
  }));

  // const sectionSuggestions = [
  //   "Technical Skill",
  //   "Soft Skill",
  //   "Work Attitude",
  //   "Communication",
  //   "Problem Solving",
  // ];

  // const [keyword, setKeyword] = useState("");
  // const filteredSuggestions = keyword
  //   ? sectionSuggestions.filter((s) =>
  //       s.toLowerCase().includes(keyword.toLowerCase())
  //     )
  //   : [];
  // const sectionQuery: SectionQuery = {};
  // const { data: sections = [] } = useSection(sectionQuery);
  // const sectionOptions = useMemo<SelectOption[]>(() => {
  //   return sections.map((s) => ({
  //     label: s.sectionTitle,
  //     value: s.sectionId,
  //   }));
  // }, [sections]);
  // const formRef = useRef<HTMLFormElement>(null);

  return (
    <Field.Root invalid={!!error}>
      <Field.Label>Form structure</Field.Label>
      <Card.Root width="100%">
        <Card.Body padding="16px" minHeight="360px">
          <Flex flexDirection="column" gap="16px">
            <FormSectionList
              ref={formSectionRef}
              selectionCtxRef={selectionCtxRef}
              onSectionSelected={onSectionSelected}
            />

            <Card.Root>
              <Card.Body padding="16px">
                <form
                  // ref={formRef}
                  onSubmit={handleSubmit(handleAddNewSection)}
                >
                  <Flex flexDirection="column" gap="16px">
                    <Text fontSize="md" fontWeight="semibold">
                      Add New Section
                    </Text>

                    <Flex gap="16px" flexWrap="wrap">
                      <Field.Root
                        flex="1"
                        minW="200px"
                        invalid={!!errors.sectionTitle}
                      >
                        <Field.Label>Section Name</Field.Label>
                        <Input
                          size="sm"
                          placeholder="Enter section name..."
                          {...register("sectionTitle", {
                            required: "Section name is required",
                            // onChange: (e) => {
                            //   setKeyword(e.target.value);
                            // },
                          })}
                        />
                        {/* <SelectOrCreateInput
                          options={sectionOptions}
                          placeholder="Type or select section"
                          onSubmit={(val) => {
                            formRef.current?.requestSubmit();
                          }}
                        /> */}

                        {errors.sectionTitle && (
                          <Field.ErrorText>
                            {errors.sectionTitle.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>

                      <Field.Root
                        flex="1"
                        minW="200px"
                        invalid={!!errors.reviewConfigCode}
                      >
                        <Field.Label>Config Type</Field.Label>
                        {isLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          <NativeSelect.Root size="sm">
                            <NativeSelect.Field
                              {...register("reviewConfigCode", {
                                required: "Config is required",
                              })}
                            >
                              {reviewConfigs.map((config) => (
                                <option
                                  key={config.reviewConfigCode}
                                  value={config.reviewConfigCode}
                                >
                                  {config.reviewConfigType} -{" "}
                                  {config.reviewConfigRoles.join(", ")}
                                </option>
                              ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                          </NativeSelect.Root>
                        )}
                        {errors.reviewConfigCode && (
                          <Field.ErrorText>
                            {errors.reviewConfigCode.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    </Flex>

                    <Button
                      type="submit"
                      size="sm"
                      colorPalette="blue"
                      alignSelf="flex-start"
                      // disabled={!isValid}
                    >
                      <FaPlus /> Add Section
                    </Button>
                  </Flex>
                </form>
              </Card.Body>
            </Card.Root>
          </Flex>
        </Card.Body>
      </Card.Root>
      {error && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  );
});

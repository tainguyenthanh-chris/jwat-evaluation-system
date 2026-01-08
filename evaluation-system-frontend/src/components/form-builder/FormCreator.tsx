import { forwardRef, useImperativeHandle, useRef } from "react";
import { type FormSection } from "./form-section/FormSectionList";
import { Flex } from "@chakra-ui/react";
import { FormMetaFields, type FormMetaHandler } from "./FormMetaFields";
import {
  FormStructureEditor,
  type FormStructureEditorHandler,
} from "./FormStructureEditor";
import { useMutation } from "@tanstack/react-query";
import { axiosInstant, type ApiResponse } from "../../lib/axios";
import { toaster } from "../ui/toaster";

export type AddFormTemplate = {
  formTitle: string;
  departmentCode: string;
  positionCode: string;
  levelCode: string;
  sectionList: FormSection[];
};

export interface FormCreatorHandler {
  submit: () => void;
  addSection: (section: Omit<FormSection, "order" | "criteriaList">) => void;
  getSelectedSection: () => FormSection | null;
  getData: () => AddFormTemplate | undefined;
}

export type FormCreatorProps = {
  onChange: () => void;
};

export const FormCreator = forwardRef<FormCreatorHandler, FormCreatorProps>(
  ({ onChange }, ref) => {
    const metaRef = useRef<FormMetaHandler>(null);
    const structureRef = useRef<FormStructureEditorHandler>(null);

    const createFormTemplateMutation = useMutation({
      mutationFn: async (data: AddFormTemplate) => {
        const response = await axiosInstant.post<ApiResponse<void>>(
          "/form",
          data
        );
        return response.data;
      },
      onSuccess: (response) => {
        toaster.create({
          description: response.message || "Create form template successfully",
          type: "success",
        });

        metaRef.current?.reset();
        structureRef.current?.clearSections();
      },
    });

    const handleSubmitFormTemplate = async () => {
      const metaValid = await metaRef.current?.validate();
      const structureValid = await structureRef.current?.validate();
      if (!metaValid || !structureValid) return;

      const metaFormData = metaRef.current?.getData();
      const sectionData = structureRef.current?.getSections() || [];

      const payload: AddFormTemplate = {
        formTitle: metaFormData!.formTitle!,
        departmentCode: metaFormData!.departmentCode!,
        positionCode: metaFormData!.positionCode!,
        levelCode: metaFormData!.levelCode!,
        sectionList: sectionData,
      };

      createFormTemplateMutation.mutate(payload);
    };

    useImperativeHandle(ref, () => ({
      submit: handleSubmitFormTemplate,
      addSection: (section) => {
        structureRef.current?.addSection(section);
      },
      getSelectedSection: () =>
        structureRef.current?.getSelectedSection() ?? null,
      getData: () => metaRef?.current?.getData(),
    }));

    return (
      <Flex flexDirection="column" gap="16px">
        <FormMetaFields ref={metaRef} onChange={onChange} />
        <FormStructureEditor
          ref={structureRef}
          getFormMeta={() => metaRef.current?.getData()}
        />
      </Flex>
    );
  }
);

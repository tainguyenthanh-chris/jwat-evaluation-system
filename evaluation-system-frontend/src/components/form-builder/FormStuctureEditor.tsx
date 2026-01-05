import {
  Button,
  Card,
  Field,
  Flex,
  Input,
  NativeSelect,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import {
  FormSectionList,
  type FormSectionHandler,
} from "./form-section/FormSectionList";
import { useQuery } from "@tanstack/react-query";
import { axiosInstant, type ApiResponse } from "../../lib/axios";
import {
  type ReviewConfig,
  ReviewConfigProvider,
} from "../../context/ReviewConfigContext";

type AddSectionForm = {
  secTitle: string;
  revConfCd: string;
};

export const FormStructureEditor = forwardRef<FormSectionHandler>((_, ref) => {
  const formSectionRef = useRef<FormSectionHandler>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<AddSectionForm>({
    defaultValues: {
      secTitle: "",
      revConfCd: "",
    },
  });

  const { data: reviewConfigs = [], isLoading } = useQuery({
    queryKey: ["review-configs"],
    queryFn: async () => {
      const res = await axiosInstant.get<ApiResponse<ReviewConfig[]>>(
        "/review-config"
      );
      return res.data.data;
    },
  });

  const handleAddNewSection = (data: AddSectionForm) => {
    const selectedConfig = reviewConfigs.find(
      (config) => config.revConfCd === data.revConfCd
    );

    if (!selectedConfig) return;

    formSectionRef.current?.addSection({
      secId: "",
      secTitle: data.secTitle.trim(),
      revConfType: selectedConfig.revConfType,
      defaultRevConfCd: selectedConfig.revConfCd,
    });

    reset();
  };

  useImperativeHandle(ref, () => ({
    addSection: (section) => formSectionRef.current?.addSection(section),
    updateSection: (tempId, updates) =>
      formSectionRef.current?.updateSection(tempId, updates),
    removeSection: (tempId) => formSectionRef.current?.removeSection(tempId),
    moveSectionUp: (tempId) => formSectionRef.current?.moveSectionUp(tempId),
    moveSectionDown: (tempId) =>
      formSectionRef.current?.moveSectionDown(tempId),
    getSections: () => formSectionRef.current?.getSections() ?? [],
    clearSections: () => formSectionRef.current?.clearSections(),
  }));

  return (
    <ReviewConfigProvider value={reviewConfigs}>
      <Card.Root>
        <Card.Body padding="16px" minHeight="360px">
          <Flex flexDirection="column" gap="16px">
            <FormSectionList ref={formSectionRef} />

            <Card.Root>
              <Card.Body padding="16px">
                <form onSubmit={handleSubmit(handleAddNewSection)}>
                  <Flex flexDirection="column" gap="16px">
                    <Text fontSize="md" fontWeight="semibold">
                      Add New Section
                    </Text>

                    <Flex gap="16px" flexWrap="wrap">
                      <Field.Root
                        flex="1"
                        minW="200px"
                        invalid={!!errors.secTitle}
                      >
                        <Field.Label>Section Name</Field.Label>
                        <Input
                          size="sm"
                          placeholder="Enter section name..."
                          {...register("secTitle", {
                            required: "Section name is required",
                          })}
                        />
                        {errors.secTitle && (
                          <Field.ErrorText>
                            {errors.secTitle.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>

                      <Field.Root
                        flex="1"
                        minW="200px"
                        invalid={!!errors.revConfCd}
                      >
                        <Field.Label>Config Type</Field.Label>
                        {isLoading ? (
                          <Spinner size="sm" />
                        ) : (
                          <NativeSelect.Root size="sm">
                            <NativeSelect.Field
                              placeholder="Select section config"
                              {...register("revConfCd", {
                                required: "Config is required",
                              })}
                            >
                              {reviewConfigs.map((config) => (
                                <option
                                  key={config.revConfCd}
                                  value={config.revConfCd}
                                >
                                  {config.revConfType} -{" "}
                                  {config.revConfRoles.join(", ")}
                                </option>
                              ))}
                            </NativeSelect.Field>
                            <NativeSelect.Indicator />
                          </NativeSelect.Root>
                        )}
                        {errors.revConfCd && (
                          <Field.ErrorText>
                            {errors.revConfCd.message}
                          </Field.ErrorText>
                        )}
                      </Field.Root>
                    </Flex>

                    <Button
                      type="submit"
                      size="sm"
                      colorPalette="blue"
                      alignSelf="flex-start"
                      disabled={!isValid}
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
    </ReviewConfigProvider>
  );
});

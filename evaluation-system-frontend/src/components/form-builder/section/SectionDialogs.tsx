import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Flex,
  Input,
  NativeSelect,
  Portal,
  Spinner,
  Text,
} from "@chakra-ui/react";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
  useContext,
} from "react";
import { useForm } from "react-hook-form";
import type { Section } from "./SectionItem";
import {
  useReviewConfigs,
  type ReviewConfig,
} from "../../../context/ReviewConfigContext";

const departments = [
  { departmentId: "dep1", departmentName: "HR", departmentCode: "HR" },
  { departmentId: "dep2", departmentName: "IT", departmentCode: "IT" },
  { departmentId: "dep3", departmentName: "Finance", departmentCode: "FIN" },
  { departmentId: "dep4", departmentName: "Marketing", departmentCode: "MKT" },
];

const positions = [
  {
    positionId: "pos1",
    positionName: "HR Executive",
    positionCode: "HR_EX",
    departmentId: "dep1",
  },
  {
    positionId: "pos2",
    positionName: "HR Manager",
    positionCode: "HR_MGR",
    departmentId: "dep1",
  },
  {
    positionId: "pos3",
    positionName: "Software Engineer",
    positionCode: "DEV",
    departmentId: "dep2",
  },
];

interface FormValues {
  sectionTitle: string;
  defaultReviewConfigCode: string;
  departmentCode: string;
  positionCode: string;
}

const defaultFormValues: FormValues = {
  sectionTitle: "",
  defaultReviewConfigCode: "",
  departmentCode: "",
  positionCode: "",
};

interface SectionFormFieldsProps {
  register: ReturnType<typeof useForm<FormValues>>["register"];
  errors: ReturnType<typeof useForm<FormValues>>["formState"]["errors"];
  departmentCode: string;
  onDeptChange: (value: string) => void;
}

const SectionFormFields = ({
  register,
  errors,
  departmentCode,
  onDeptChange,
}: SectionFormFieldsProps) => {
  const reviewConfigs = useReviewConfigs();

  const filteredPositions = useMemo(
    () => positions.filter((p) => p.departmentId === departmentCode),
    [departmentCode]
  );

  return (
    <Flex direction="column" gap="12px">
      <Field.Root invalid={!!errors.sectionTitle}>
        <Field.Label>Section title</Field.Label>
        <Input
          size="sm"
          {...register("sectionTitle", {
            required: "Section title is required",
            minLength: { value: 3, message: "Must be at least 3 characters" },
            maxLength: {
              value: 100,
              message: "Must be at most 100 characters",
            },
          })}
        />
        {errors.sectionTitle && (
          <Field.ErrorText>{errors.sectionTitle.message}</Field.ErrorText>
        )}
      </Field.Root>

      <Field.Root invalid={!!errors.defaultReviewConfigCode}>
        <Field.Label>Section config</Field.Label>
        <NativeSelect.Root size="sm">
          <NativeSelect.Field
            {...register("defaultReviewConfigCode", {
              required: "Section config is required",
            })}
          >
            <option value="">Select config</option>
            {reviewConfigs.map((config) => (
              <option
                key={config.reviewConfigCode}
                value={config.reviewConfigCode}
              >
                {config.reviewConfigCode} ({config.reviewConfigType})
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        {errors.defaultReviewConfigCode && (
          <Field.ErrorText>
            {errors.defaultReviewConfigCode.message}
          </Field.ErrorText>
        )}
      </Field.Root>

      <Field.Root>
        <Field.Label>Department (optional)</Field.Label>
        <NativeSelect.Root size="sm">
          <NativeSelect.Field
            {...register("departmentCode")}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              onDeptChange(e.target.value);
            }}
          >
            <option value="">Select department</option>
            {departments.map((department) => (
              <option
                key={department.departmentId}
                value={department.departmentCode}
              >
                {department.departmentName}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>

      <Field.Root>
        <Field.Label>Position (optional)</Field.Label>
        <NativeSelect.Root size="sm" disabled={!departmentCode}>
          <NativeSelect.Field {...register("positionCode")}>
            <option value="">
              {departmentCode ? "Select position" : "Select department first"}
            </option>
            {filteredPositions.map((pos) => (
              <option key={pos.positionId} value={pos.positionCode}>
                {pos.positionName}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
    </Flex>
  );
};

export interface UpdateSectionDialogRef {
  open: (sectionId: string) => void;
  close: () => void;
}

interface UpdateSectionDialogProps {
  onSubmit: (sectionId: string, data: FormValues) => Promise<void>;
  getSection: (sectionId: string) => Section | undefined;
}

export const UpdateSectionDialog = forwardRef<
  UpdateSectionDialogRef,
  UpdateSectionDialogProps
>(function UpdateSectionDialog({ onSubmit, getSection }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormValues>({ defaultValues: defaultFormValues });

  const departmentCode = watch("departmentCode");

  useImperativeHandle(ref, () => ({
    open: (sectionId) => {
      const section = getSection(sectionId);
      if (!section) return;
      setCurrentSectionId(sectionId);
      reset({
        sectionTitle: section.sectionTitle,
        defaultReviewConfigCode: section.defaultReviewConfigCode,
        departmentCode: section.cueList[0]?.cueCd || "",
        positionCode: section.cueList[1]?.cueCd || "",
      });
      setIsOpen(true);
    },
    close: () => setIsOpen(false),
  }));

  const handleDeptChange = useCallback(
    (value: string) => {
      setValue("departmentCode", value);
      setValue("positionCode", "");
    },
    [setValue]
  );

  const handleEditSection = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(currentSectionId, data);
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = useCallback(() => {
    if (!isSubmitting) setIsOpen(false);
  }, [isSubmitting]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && handleClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content as="form" onSubmit={handleSubmit(handleEditSection)}>
            <Dialog.Header>
              <Dialog.Title>Edit Section</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <SectionFormFields
                register={register}
                errors={errors}
                departmentCode={departmentCode}
                onDeptChange={handleDeptChange}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                colorPalette="blue"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner size="xs" /> : "Save Changes"}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" disabled={isSubmitting} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

export interface DeleteSectionDialogRef {
  open: (sectionId: string) => void;
  close: () => void;
}

interface DeleteSectionDialogProps {
  onSubmit: (sectionId: string) => Promise<void>;
  getSection: (sectionId: string) => Section | undefined;
}

export const DeleteSectionDialog = forwardRef<
  DeleteSectionDialogRef,
  DeleteSectionDialogProps
>(function DeleteSectionDialog({ onSubmit, getSection }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState("");
  const [sectionTitle, setSectionTitle] = useState("");

  useImperativeHandle(ref, () => ({
    open: (sectionId) => {
      const section = getSection(sectionId);
      if (!section) return;
      setCurrentSectionId(sectionId);
      setSectionTitle(section.sectionTitle);
      setIsOpen(true);
    },
    close: () => setIsOpen(false),
  }));

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit(currentSectionId);
      setCurrentSectionId("");
      setSectionTitle("");
      setIsOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = useCallback(() => {
    if (!isSubmitting) setIsOpen(false);
  }, [isSubmitting]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => !e.open && handleClose()}
      role="alertdialog"
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete Section</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text>
                Are you sure you want to delete the section{" "}
                <Text as="span" fontWeight="semibold">
                  "{sectionTitle}"
                </Text>
                ? This action cannot be undone.
              </Text>
            </Dialog.Body>
            <Dialog.Footer>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                colorPalette="red"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner size="xs" /> : "Delete"}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" disabled={isSubmitting} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
});

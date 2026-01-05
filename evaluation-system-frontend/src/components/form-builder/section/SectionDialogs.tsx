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
} from "react";
import { useForm } from "react-hook-form";
import type { CreateNewSection } from "./SectionList";
import type { Section } from "./SectionItem";

export const sectionConfigs = [
  { code: "POINT_SELF_LEADER", type: "POINT", roleList: ["SELF", "LEADER"] },
  { code: "COMMENT_SELF", type: "COMMENT", roleList: ["SELF"] },
  { code: "COMMENT_LEADER", type: "COMMENT", roleList: ["LEADER"] },
  { code: "COMMENT_MANAGER", type: "COMMENT", roleList: ["MANAGER"] },
  { code: "COMMENT_DIRECTOR", type: "COMMENT", roleList: ["DIRECTOR"] },
  { code: "TARGET_LEADER", type: "TARGET", roleList: ["LEADER"] },
] as const;

export const departments = [
  { deptId: "dep1", deptNm: "HR", deptCd: "HR" },
  { deptId: "dep2", deptNm: "IT", deptCd: "IT" },
  { deptId: "dep3", deptNm: "Finance", deptCd: "FIN" },
  { deptId: "dep4", deptNm: "Marketing", deptCd: "MKT" },
] as const;

export const positions = [
  { posId: "pos1", posNm: "HR Executive", posCd: "HR_EX", depId: "dep1" },
  { posId: "pos2", posNm: "HR Manager", posCd: "HR_MGR", depId: "dep1" },
  { posId: "pos3", posNm: "Software Engineer", posCd: "DEV", depId: "dep2" },
  { posId: "pos4", posNm: "QA Engineer", posCd: "QA", depId: "dep2" },
] as const;

interface FormValues {
  secTitle: string;
  defaultRevConfCd: string;
  deptCd: string;
  posCd: string;
}

const defaultFormValues: FormValues = {
  secTitle: "",
  defaultRevConfCd: "",
  deptCd: "",
  posCd: "",
};

interface SectionFormFieldsProps {
  register: ReturnType<typeof useForm<FormValues>>["register"];
  errors: ReturnType<typeof useForm<FormValues>>["formState"]["errors"];
  deptCd: string;
  onDeptChange: (value: string) => void;
}

const SectionFormFields = ({
  register,
  errors,
  deptCd,
  onDeptChange,
}: SectionFormFieldsProps) => {
  const filteredPositions = useMemo(
    () => positions.filter((p) => p.depId === deptCd),
    [deptCd]
  );

  return (
    <Flex direction="column" gap="12px">
      <Field.Root invalid={!!errors.secTitle}>
        <Field.Label>Section title</Field.Label>
        <Input
          size="sm"
          {...register("secTitle", {
            required: "Section title is required",
            minLength: {
              value: 3,
              message: "Section title must be at least 3 characters",
            },
            maxLength: {
              value: 100,
              message: "Section title must be at most 100 characters",
            },
          })}
        />
        {errors.secTitle && (
          <Field.ErrorText>{errors.secTitle.message}</Field.ErrorText>
        )}
      </Field.Root>

      <Field.Root invalid={!!errors.defaultRevConfCd}>
        <Field.Label>Section config</Field.Label>
        <NativeSelect.Root size="sm">
          <NativeSelect.Field
            {...register("defaultRevConfCd", {
              required: "Section config is required",
            })}
          >
            <option value="">Select config</option>
            {sectionConfigs.map((config) => (
              <option key={config.code} value={config.code}>
                {config.code} ({config.type})
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        {errors.defaultRevConfCd && (
          <Field.ErrorText>{errors.defaultRevConfCd.message}</Field.ErrorText>
        )}
      </Field.Root>

      <Field.Root>
        <Field.Label>Department (optional)</Field.Label>
        <NativeSelect.Root size="sm">
          <NativeSelect.Field
            {...register("deptCd")}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              onDeptChange(e.target.value);
            }}
          >
            <option value="">Select department</option>
            {departments.map((dep) => (
              <option key={dep.deptId} value={dep.deptId}>
                {dep.deptNm}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>

      <Field.Root>
        <Field.Label>Position (optional)</Field.Label>
        <NativeSelect.Root size="sm" disabled={!deptCd}>
          <NativeSelect.Field {...register("posCd")}>
            <option value="">
              {deptCd ? "Select position" : "Select department first"}
            </option>
            {filteredPositions.map((pos) => (
              <option key={pos.posId} value={pos.posId}>
                {pos.posNm}
              </option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
    </Flex>
  );
};

export interface CreateNewSectionDialogRef {
  open: () => void;
  close: () => void;
}

interface CreateNewSectionDialogProps {
  onSubmit: (data: CreateNewSection) => Promise<void>;
  getSection: (sectionId: string) => Section | undefined;
}

export const CreateNewSectionDialog = forwardRef<
  CreateNewSectionDialogRef,
  CreateNewSectionDialogProps
>(function CreateNewSectionDialog({ onSubmit }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FormValues>({ defaultValues: defaultFormValues });

  const deptCd = watch("deptCd");

  useImperativeHandle(ref, () => ({
    open: () => {
      reset(defaultFormValues);
      setIsOpen(true);
    },
    close: () => setIsOpen(false),
  }));

  const handleDeptChange = useCallback(
    (value: string) => {
      setValue("deptCd", value);
      setValue("posCd", "");
    },
    [setValue]
  );

  const handleCreateSection = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      setIsOpen(false);
      reset(defaultFormValues);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      setIsOpen(false);
    }
  }, [isSubmitting]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && handleClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            as="form"
            onSubmit={handleSubmit(handleCreateSection)}
          >
            <Dialog.Header>
              <Dialog.Title>Create new section</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <SectionFormFields
                register={register}
                errors={errors}
                deptCd={deptCd}
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
                {isSubmitting ? <Spinner size="xs" /> : "Create"}
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

export interface UpdateSectionDialogRef {
  open: (sectionId: string) => void;
  close: () => void;
}

interface UpdateSectionDialogProps {
  onSubmit: (sectionId: string, data: CreateNewSection) => Promise<void>;
  getSection: (sectionId: string) => Section | undefined;
}

export const UpdateSectionDialog = forwardRef<
  UpdateSectionDialogRef,
  UpdateSectionDialogProps
>(function UpdateSectionDialog({ onSubmit, getSection }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<FormValues>({ defaultValues: defaultFormValues });

  const deptCd = watch("deptCd");

  useImperativeHandle(ref, () => ({
    open: (sectionId: string) => {
      const section = getSection(sectionId);
      if (section) {
        setCurrentSectionId(sectionId);
        reset({
          secTitle: section.secTitle,
          defaultRevConfCd: section.defaultRevConfCd,
          deptCd: section.cueList[0]?.cueCd || "",
          posCd: section.cueList[1]?.cueCd || "",
        });
        setIsOpen(true);
      }
    },
    close: () => setIsOpen(false),
  }));

  const handleDeptChange = useCallback(
    (value: string) => {
      setValue("deptCd", value);
      setValue("posCd", "");
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
    if (!isSubmitting) {
      setIsOpen(false);
    }
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
                deptCd={deptCd}
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
  const [currentSectionId, setCurrentSectionId] = useState<string>("");
  const [sectionTitle, setSectionTitle] = useState<string>("");

  useImperativeHandle(ref, () => ({
    open: (sectionId: string) => {
      const section = getSection(sectionId);
      if (section) {
        setCurrentSectionId(sectionId);
        setSectionTitle(section.secTitle);
        setIsOpen(true);
      }
    },
    close: () => setIsOpen(false),
  }));

  const handleDelete = async () => {
    setIsSubmitting(true);

    try {
      await onSubmit(currentSectionId);
      setIsOpen(false);
      setCurrentSectionId("");
      setSectionTitle("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      setIsOpen(false);
    }
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

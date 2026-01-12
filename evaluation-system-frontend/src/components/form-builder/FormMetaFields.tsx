import { useForm } from "react-hook-form";
import type { AddFormTemplate } from "./FormCreator";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Field, Flex, Input, NativeSelect } from "@chakra-ui/react";

const departments = [
  { departmentId: "dep1", departmentName: "HR", departmentCode: "HR" },
  { departmentId: "dep2", departmentName: "IT", departmentCode: "IT" },
  { departmentId: "dep3", departmentName: "Finance", departmentCode: "FIN" },
  {
    departmentId: "dep4",
    departmentName: "Marketing",
    departmentCode: "MKT",
  },
] as const;

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

const levels = [
  {
    levelId: "lvl1",
    levelCode: "INTERN",
    levelName: "Intern",
    positionId: "pos1",
  },
  {
    levelId: "lvl2",
    levelCode: "JUNIOR",
    levelName: "Junior",
    positionId: "pos1",
  },
  {
    levelId: "lvl3",
    levelCode: "MIDDLE",
    levelName: "Middle",
    positionId: "pos2",
  },
  {
    levelId: "lvl4",
    levelCode: "SENIOR",
    levelName: "Senior",
    positionId: "pos3",
  },
];

export type FormMetaHandler = {
  getData: () => AddFormTemplate;
  validate: () => Promise<boolean>;
  reset: () => void;
};

type FormMetaFieldsProps = {
  onChange: () => void;
};

export const FormMetaFields = forwardRef<FormMetaHandler, FormMetaFieldsProps>(
  ({ onChange }, ref) => {
    const {
      register,
      trigger,
      getValues,
      reset,
      watch,
      formState: { errors },
    } = useForm<AddFormTemplate>();

    const selectedDepartmentCode = watch("departmentCode");
    const selectedPositionCode = watch("positionCode");
    const selectedLevelCode = watch("levelCode");

    useImperativeHandle(ref, () => ({
      getData: () => getValues(),
      validate: async () => {
        const valid = await trigger();
        return valid;
      },
      reset: () =>
        reset({
          departmentCode: "",
          positionCode: "",
          levelCode: "",
          formTitle: "",
        }),
    }));

    useEffect(() => {
      onChange();
    }, [selectedDepartmentCode, selectedPositionCode, selectedLevelCode]);

    return (
      <>
        <Flex gap="16px" flexWrap="wrap">
          <Field.Root
            invalid={!!errors.departmentCode}
            flex="1"
            minWidth="200px"
          >
            <Field.Label>Select department</Field.Label>
            <NativeSelect.Root size="sm">
              <NativeSelect.Field
                {...register("departmentCode", {
                  required: "Department is required",
                })}
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d.departmentId} value={d.departmentCode}>
                    {d.departmentName}
                  </option>
                ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {errors.departmentCode && (
              <Field.ErrorText>{errors.departmentCode.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.positionCode} flex="1" minWidth="200px">
            <Field.Label>Select position</Field.Label>
            <NativeSelect.Root size="sm" disabled={!selectedDepartmentCode}>
              <NativeSelect.Field
                {...register("positionCode", {
                  required: "Position is required",
                })}
              >
                <option value="">Select position</option>
                {positions
                  .filter((p) => {
                    const dept = departments.find(
                      (d) => d.departmentId === p.departmentId
                    );
                    return dept?.departmentCode === selectedDepartmentCode;
                  })
                  .map((p) => (
                    <option key={p.positionId} value={p.positionCode}>
                      {p.positionName}
                    </option>
                  ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {errors.positionCode && (
              <Field.ErrorText>{errors.positionCode.message}</Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={!!errors.levelCode} flex="1" minWidth="200px">
            <Field.Label>Select level</Field.Label>
            <NativeSelect.Root size="sm" disabled={!selectedPositionCode}>
              <NativeSelect.Field
                {...register("levelCode", { required: "Level is required" })}
              >
                <option value="">Select level</option>
                {levels
                  .filter((l) => {
                    const pos = positions.find(
                      (p) => p.positionId === l.positionId
                    );
                    return pos?.positionCode === selectedPositionCode;
                  })
                  .map((l) => (
                    <option key={l.levelId} value={l.levelCode}>
                      {l.levelName}
                    </option>
                  ))}
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
            {errors.levelCode && (
              <Field.ErrorText>{errors.levelCode.message}</Field.ErrorText>
            )}
          </Field.Root>
        </Flex>

        <Field.Root invalid={!!errors.formTitle}>
          <Field.Label>Form title</Field.Label>
          <Input
            size="sm"
            placeholder="Form title..."
            {...register("formTitle", { required: "Form title is required" })}
          />
          {errors.formTitle && (
            <Field.ErrorText>{errors.formTitle.message}</Field.ErrorText>
          )}
        </Field.Root>
      </>
    );
  }
);

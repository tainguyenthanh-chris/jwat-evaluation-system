import { useForm } from "react-hook-form";
import type { AddFormTemplate } from "./FormCreator";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { Field, Flex, Input, NativeSelect } from "@chakra-ui/react";

const departments = [
  {
    departmentId: "dept20250101001",
    departmentName: "IT",
    departmentCode: "IT",
  },

  {
    departmentId: "dept20250101002",
    departmentName: "HR",
    departmentCode: "HR",
  },
  // { departmentId: "dep3", departmentName: "Finance", departmentCode: "FIN" },
  // {
  //   departmentId: "dep4",
  //   departmentName: "Marketing",
  //   departmentCode: "MKT",
  // },
] as const;

const positions = [
  {
    positionId: "pos20250101001",
    positionName: "Developer",
    positionCode: "DEV",
    departmentId: "dept20250101001",
  },
  {
    positionId: "pos20250101002",
    positionName: "Tester",
    positionCode: "TESTER",
    departmentId: "dept20250101001",
  },
  {
    positionId: "pos20250101003",
    positionName: "Business Analyst",
    positionCode: "BA",
    departmentId: "dept20250101001",
  },
  {
    positionId: "pos20250101004",
    positionName: "IT Operations",
    positionCode: "OPS",
    departmentId: "dept20250101001",
  },

  {
    positionId: "pos20250101005",
    positionName: "HR Generalist",
    positionCode: "HRG",
    departmentId: "dept20250101002",
  },
  {
    positionId: "pos20250101006",
    positionName: "Recruiter",
    positionCode: "REC",
    departmentId: "dept20250101002",
  },
  {
    positionId: "pos20250101007",
    positionName: "HR Admin",
    positionCode: "ADM",
    departmentId: "dept20250101002",
  },
];

const levels = [
  {
    levelId: "lvl20250101001",
    levelCode: "FRESHER",
    levelName: "Fresher",
    positionId: "pos20250101001",
  },
  {
    levelId: "lvl20250101002",
    levelCode: "JUNIOR",
    levelName: "Junior",
    positionId: "pos20250101001",
  },
  {
    levelId: "lvl20250101003",
    levelCode: "MIDDLE",
    levelName: "Middle",
    positionId: "pos20250101001",
  },
  {
    levelId: "lvl20250101004",
    levelCode: "SENIOR",
    levelName: "Senior",
    positionId: "pos20250101001",
  },

  {
    levelId: "lvl20250101005",
    levelCode: "FRESHER",
    levelName: "Fresher",
    positionId: "pos20250101002",
  },
  {
    levelId: "lvl20250101006",
    levelCode: "JUNIOR",
    levelName: "Junior",
    positionId: "pos20250101002",
  },
  {
    levelId: "lvl20250101007",
    levelCode: "MIDDLE",
    levelName: "Middle",
    positionId: "pos20250101002",
  },
  {
    levelId: "lvl20250101008",
    levelCode: "SENIOR",
    levelName: "Senior",
    positionId: "pos20250101002",
  },

  {
    levelId: "lvl20250101009",
    levelCode: "FRESHER",
    levelName: "Fresher",
    positionId: "pos20250101003",
  },
  {
    levelId: "lvl20250101010",
    levelCode: "JUNIOR",
    levelName: "Junior",
    positionId: "pos20250101003",
  },
  {
    levelId: "lvl20250101011",
    levelCode: "MIDDLE",
    levelName: "Middle",
    positionId: "pos20250101003",
  },
  {
    levelId: "lvl20250101012",
    levelCode: "JUNIOR",
    levelName: "Junior",
    positionId: "pos20250101003",
  },

  {
    levelId: "lvl20250101013",
    levelCode: "MIDDLE",
    levelName: "Middle",
    positionId: "pos20250101004",
  },
  {
    levelId: "lvl20250101014",
    levelCode: "SENIOR",
    levelName: "Senior",
    positionId: "pos20250101004",
  },

  {
    levelId: "lvl20250101015",
    levelCode: "JUNIOR",
    levelName: "Junior",
    positionId: "pos20250101005",
  },
  {
    levelId: "lvl20250101016",
    levelCode: "MIDDLE",
    levelName: "Middle",
    positionId: "pos20250101005",
  },
  {
    levelId: "lvl20250101017",
    levelCode: "SENIOR",
    levelName: "Senior",
    positionId: "pos20250101005",
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

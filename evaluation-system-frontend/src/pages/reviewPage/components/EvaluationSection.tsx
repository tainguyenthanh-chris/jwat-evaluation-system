import {
  Box,
  Button,
  Flex,
  Input,
  NumberInput,
  Text,
  Textarea,
} from "@chakra-ui/react";
import type { Section } from "../../../types/section";
import type { Target } from "../../../types/target";
import TargetItem from "./TargetItem";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import type { SubmissionValue } from "../../../types/submissionValue";
import type { SubmissionValueMap } from "../../../types/submissionValueMap";
import type { SummarySubmission } from "../ReviewPage";

export type SectionRef = {
  getData: () => any;
};

type Props = {
  section: Partial<Section>;
  targetList?: Partial<Target>[];
  role?: string;
  submissionValueMap?: SubmissionValueMap;
  newTargetList?: Partial<Target>[];
  currentTargetList?: Partial<Target>[];
  // summarySubmissionList?: Partial<SummarySubmission>[];
};

const EvaluationSection = forwardRef<SectionRef, Props>(
  (
    {
      section,
      role,
      submissionValueMap,
      newTargetList,
      currentTargetList,
      // summarySubmissionList,
    },
    ref
  ) => {
    // console.log(submissionValueMap);
    // const safeTargetList = targetList ?? [];
    const [currentTargetListLocal, setCurrentTargetListLocal] = useState<
      Partial<Target>[]
    >(() => currentTargetList ?? []);
    const [newTargetListLocal, setNewTargetListLocal] = useState<
      Partial<Target>[]
    >(() => newTargetList ?? []);

    //   // expose to parent
    useImperativeHandle(ref, () => ({
      getData() {
        if (hasEmptyPointInput()) {
          return {
            error: "EMPTY_INPUT",
            message: "Please fill all required scores before submit",
          };
        }
        const hasNewTarget = newTargetListLocal.some((t) => !t.targetId);

        const isNewTargetListChanged =
          newTargetListLocal.length !== (newTargetList?.length ?? 0);

        const changedCurrentTargetListLocal = currentTargetListLocal.filter(
          (local) => {
            if (!local.targetId) return false;
            const official = currentTargetList?.find(
              (o) => o.targetId === local.targetId
            );
            if (!official) return false;
            return local.targetStatus !== official.targetStatus;
          }
        );
        return {
          submissionValueMapLocal,
          newTargetListLocal:
            hasNewTarget || isNewTargetListChanged ? newTargetListLocal : [],

          currentTargetListLocal:
            changedCurrentTargetListLocal.length > 0
              ? changedCurrentTargetListLocal
              : [],
          summarySubmission: {
            sectionTitle: section.sectionTitle,
            summaryPoint,
          },
        };
      },
    }));

    const config = section.config;

    const checkRole = (allowedRole: string) => {
      if (!role) return false;
      return role.includes(allowedRole);
    };
    const newTargetInputRef = useRef<HTMLInputElement>(null);

    const [submissionValueMapLocal, setSubmissionValueMapLocal] = useState<
      Record<string, Partial<SubmissionValue>>
    >({});

    const handleSubmissionValueChange = (
      key: string,
      formDetailId: string,
      role: string,
      value: string,
      submissionValueId?: string | null
    ) => {
      setSubmissionValueMapLocal((prev) => ({
        ...prev,
        [key]: {
          submissionValueId: submissionValueId ?? undefined,
          formDetailId,
          submissionRole: role,
          formSubmissionValue: value,
        },
      }));
    };

    const handleAddNewTarget = () => {
      const value = newTargetInputRef.current?.value?.trim();
      if (!value) return;
      const lastItem = newTargetListLocal.at(-1);
      const newOrderNo = lastItem?.targetOrderNo
        ? lastItem.targetOrderNo + 1
        : 1;
      const target = {
        formDetailId: section?.formDetailId,
        targetOrderNo: newOrderNo,
        targetContent: value,
        targetStatus: "NEW",
      };
      newTargetInputRef.current!.value = "";
      setNewTargetListLocal((prev) => [...prev, target]);
    };

    const handleUpdateTargetStatus = (
      targetId: string,
      status: Target["targetStatus"]
    ) => {
      setCurrentTargetListLocal((prev) =>
        prev.map((t) =>
          t.targetId === targetId ? { ...t, targetStatus: status } : t
        )
      );
    };
    const handleDeleteNewTarget = (targetContent: string) => {
      setNewTargetListLocal((prev) =>
        prev.filter((t) => t.targetContent !== targetContent)
      );
    };

    const calcFinalByCriteria = (c: any): number | null => {
      if (!config?.configRoleList?.length) return null;

      const values = config.configRoleList
        .map((role) => {
          const key = `${c.formDetailId}_${role}`;
          const item =
            submissionValueMapLocal?.[key] ?? submissionValueMap?.[key];
          const num = Number(item?.formSubmissionValue);
          return Number.isFinite(num) ? num : null;
        })
        .filter((v): v is number => v !== null);

      if (values.length === 0) return null;

      return values.reduce((sum, v) => sum + v, 0) / values.length;
    };

    const summaryPoint = (() => {
      if (!section.criteriaList?.length) return null;

      const finals = section.criteriaList
        .map(calcFinalByCriteria)
        .filter((v): v is number => v !== null);

      if (finals.length === 0) return 0;
      return Number(
        (finals.reduce((sum, v) => sum + v, 0) / finals.length).toFixed(1)
      );
    })();

    const calcGrade = (
      point: number | null
    ): "A" | "B" | "C" | "D" | "GRADE" => {
      if (point === null) return "GRADE";
      if (point >= 9) return "A";
      if (point >= 8) return "B";
      if (point >= 6.5) return "C";
      return "D";
    };

    const hasEmptyPointInput = (): boolean => {
      if (config?.configType !== "POINT") return false;
      if (!section.criteriaList?.length) return false;
      if (!config.configRoleList?.length) return false;

      return section.criteriaList.some((c) =>
        config.configRoleList!.some((r) => {
          if (!checkRole(r)) return false;
          const key = `${c.formDetailId}_${r}`;
          const item =
            submissionValueMapLocal?.[key] ?? submissionValueMap?.[key];
          const value = item?.formSubmissionValue;

          return value === "" || value === undefined || value === null;
        })
      );
    };

    return (
      <>
        {" "}
        {config?.configType === "POINT" && (
          <Flex justify={"right"} mt={6} mb={2}>
            <Text mx={"20px"} bg="red.50" px={"10px"}>
              {calcGrade(summaryPoint)}
            </Text>
            <Text mx={"20px"} bg="yellow.50" px={"10px"}>
              {summaryPoint}
            </Text>
          </Flex>
        )}
        <Box
          mb={6}
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          overflow="hidden"
        >
          {config?.configType === "POINT" ? (
            <>
              <Flex
                bg="blue.50"
                px={4}
                py={2}
                fontWeight="semibold"
                align="center"
                color="blue.700"
                overflow={"visible"}
              >
                {" "}
                <Flex align="center" flex={1}>
                  <Text>{section.sectionTitle}</Text>
                  {/* <Box w="1px" h="14px" bg="gray.400" mx="20px" /> */}
                  {/* <Text mx={"20px"} bg="blue.50">
                  GRADE
                </Text>
                <Box w="1px" h="14px" bg="gray.400" mx="20px" />
                <Text mx={"20px"}>AVG</Text> */}
                </Flex>
                <Box w="1px" h="14px" bg="gray.400" mx="20px" />
                {config?.configRoleList?.map((role, index) => (
                  <Text key={index} w="90px" textAlign="center">
                    {role}
                  </Text>
                ))}
                <Text w="90px" textAlign="center">
                  Final
                </Text>
              </Flex>
              {}{" "}
              {section.criteriaList?.map((c, idx) => {
                // const finalValue = (() => {
                //   if (!config.configRoleList?.length) return "";
                //   const values = config.configRoleList
                //     .map((role) => {
                //       const key = `${c.formDetailId}_${role}`;
                //       const item =
                //         submissionValueMapLocal?.[key] ??
                //         submissionValueMap?.[key];
                //       const num = Number(item?.formSubmissionValue);
                //       return Number.isFinite(num) ? num : null;
                //     })
                //     .filter((v): v is number => v !== null);
                //   if (values.length === 0) return "";
                //   const avg =
                //     values.reduce((sum, v) => sum + v, 0) / values.length;
                //   return avg.toFixed(1);
                // })();
                const finalNumber = calcFinalByCriteria(c);
                const finalValue =
                  finalNumber !== null ? finalNumber.toFixed(1) : "";
                return (
                  <Flex
                    key={c.formDetailId}
                    align="center"
                    borderTop="1px solid"
                    borderColor="gray.200"
                    bg={idx % 2 === 0 ? "gray.50" : "white"}
                    padding={"5px"}
                  >
                    <Text w="40px" textAlign="center">
                      {idx + 1}
                    </Text>

                    <Text flex={1} px={2}>
                      {c.criteriaContent}
                    </Text>
                    {config.configRoleList?.map((role) => {
                      const key = `${c.formDetailId}_${role}`;
                      const valueItem =
                        submissionValueMapLocal?.[key] ??
                        submissionValueMap?.[key] ??
                        {};
                      const value = valueItem.formSubmissionValue ?? "";
                      const submissionValueId =
                        valueItem.submissionValueId ?? null;
                      return (
                        <NumberInput.Root
                          key={key}
                          value={value}
                          min={0}
                          max={10}
                          clampValueOnBlur
                          disabled={!checkRole(role)}
                          w="90px"
                          mx="5px"
                          size="sm"
                          onValueChange={({ valueAsNumber }) => {
                            handleSubmissionValueChange(
                              key,
                              c.formDetailId!,
                              role,
                              Number.isNaN(valueAsNumber)
                                ? ""
                                : String(valueAsNumber),
                              submissionValueId
                            );
                          }}
                        >
                          <NumberInput.Input
                            textAlign="center"
                            placeholder={role}
                          />
                        </NumberInput.Root>
                      );
                    })}

                    <Input
                      w="90px"
                      size="sm"
                      textAlign="center"
                      fontWeight="bold"
                      readOnly={true}
                      placeholder="Final"
                      value={finalValue}
                    />
                  </Flex>
                );
              })}
            </>
          ) : config?.configType === "TARGET" ? (
            <>
              <Box
                bg="blue.50"
                px={4}
                py={2}
                fontWeight="semibold"
                color="blue.700"
              >
                <Text>{section.sectionTitle}</Text>
              </Box>
              {config.configRoleList?.map((role) => (
                <Flex
                  key={role}
                  pointerEvents={checkRole(role) ? "auto" : "none"}
                  opacity={checkRole(role) ? 1 : 0.5}
                >
                  <Box flex={1} padding={"5px"}>
                    {currentTargetListLocal?.map((item) => (
                      <TargetItem
                        key={item.targetId}
                        item={item}
                        onChangeStatus={handleUpdateTargetStatus}
                      />
                    ))}
                  </Box>
                  <Box w="1px" bg="gray.300" mx={4} />
                  <Box flex={1} padding={"5px"}>
                    <Text
                      fontWeight="semibold"
                      color="blue.700"
                      textAlign={"center"}
                    >
                      New target
                    </Text>
                    {newTargetListLocal?.map((item, index) => (
                      <TargetItem
                        key={index}
                        item={item}
                        onDelete={handleDeleteNewTarget}
                      />
                    ))}
                    <Flex justify="center" align="center" ml={"20px"}>
                      <Input
                        ref={newTargetInputRef}
                        flex={1}
                        size="sm"
                        placeholder="Enter new target"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddNewTarget();
                          }
                        }}
                      />
                      <Button
                        bg="yellow.400"
                        ml={"20px"}
                        onClick={handleAddNewTarget}
                      >
                        Add new Target
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              ))}
            </>
          ) : (
            <>
              <Box
                bg="blue.50"
                px={4}
                py={2}
                fontWeight="semibold"
                color="blue.700"
              >
                <Text>{section.sectionTitle}</Text>
              </Box>
              {config?.configRoleList?.map((role) => {
                const key = `${section.formDetailId}_${role}`;
                const valueItem =
                  submissionValueMapLocal?.[key] ??
                  submissionValueMap?.[key] ??
                  {};
                const value = valueItem.formSubmissionValue ?? "";
                const submissionValueId = valueItem.submissionValueId ?? null;
                return (
                  <Textarea
                    key={role}
                    size="sm"
                    placeholder="Enter comment..."
                    border={"none"}
                    outline={"none"}
                    disabled={!checkRole(role)}
                    value={value}
                    onChange={(e) =>
                      handleSubmissionValueChange(
                        `${section.formDetailId}_${role}`,
                        section.formDetailId!,
                        role,
                        e.target.value,
                        submissionValueId
                      )
                    }
                  />
                );
              })}
            </>
          )}
        </Box>
      </>
    );
  }
);

export default EvaluationSection;

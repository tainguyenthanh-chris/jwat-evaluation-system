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

export type SectionRef = {
  getData: () => any;
};

type Props = {
  section: Partial<Section>;
  targetList?: Partial<Target>[];
  role?: string;
};

const EvaluationSection = forwardRef<SectionRef, Props>(
  ({ section, targetList, role }, ref) => {
    const safeTargetList = targetList ?? [];
    const [currentTargetList, setCurrentTargetList] = useState<
      Partial<Target>[]
    >(() => safeTargetList.filter((t) => t.targetStatus === "WAIT"));
    const [newTargetList, setNewTargetList] = useState<Partial<Target>[]>(() =>
      safeTargetList.filter((t) => t.targetStatus === "NEW")
    );
    //   // expose to parent
    useImperativeHandle(ref, () => ({
      getData() {
        return {
          submissionValueMap,
          newTargetList,
          currentTargetList,
        };
      },
    }));

    const config = section.config;

    const checkRole = (allowedRole: string) => {
      if (!role) return false;
      return role.includes(allowedRole);
    };
    const newTargetInputRef = useRef<HTMLInputElement>(null);

    const [submissionValueMap, setSubmissionValueMap] = useState<
      Record<string, SubmissionValue>
    >({});

    const handleSubmissionValueChange = (
      key: string,
      formDetailId: string,
      role: string,
      value: string
    ) => {
      setSubmissionValueMap((prev) => ({
        ...prev,
        [key]: {
          formDetailId,
          submissionRole: role,
          formSubmissionValue: value,
        },
      }));
    };

    const handleAddNewTarget = () => {
      const value = newTargetInputRef.current?.value?.trim();
      if (!value) return;
      const lastItem = newTargetList.at(-1);
      const newOrderNo = lastItem?.targetOrderNo
        ? lastItem.targetOrderNo + 1
        : 1;
      const target = {
        formDetailId: section?.formDetailId,
        targetOrderNo: newOrderNo,
        targetContent: value,
      };
      newTargetInputRef.current!.value = "";
      setNewTargetList((prev) => [...prev, target]);
    };

    const handleUpdateTargetStatus = (
      targetId: string,
      status: Target["targetStatus"]
    ) => {
      setCurrentTargetList((prev) =>
        prev.map((t) =>
          t.targetId === targetId ? { ...t, targetStatus: status } : t
        )
      );
    };
    const handleDeleteNewTarget = (targetContent: string) => {
      setNewTargetList((prev) =>
        prev.filter((t) => t.targetContent !== targetContent)
      );
    };

    return (
      <Box
        mt={6}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        overflow="hidden"
      >
        {config?.type === "POINT" ? (
          <>
            <Flex
              bg="blue.50"
              px={4}
              py={2}
              fontWeight="semibold"
              align="center"
              color="blue.700"
            >
              {" "}
              <Text flex={1}>{section.sectionTitle}</Text>
              {config?.roleList?.map((role, index) => (
                <Text key={index} w="90px" textAlign="center">
                  {role}
                </Text>
              ))}
              <Text w="90px" textAlign="center">
                Final
              </Text>
            </Flex>
            {}{" "}
            {section.criteriaList?.map((c, idx) => (
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
                {config.roleList?.map((role) => {
                  const key = `${c.formDetailId}_${role}`;
                  const rawValue =
                    submissionValueMap[key]?.formSubmissionValue ?? "";
                  return (
                    <NumberInput.Root
                      key={key}
                      value={rawValue}
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
                            : String(valueAsNumber)
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
                />
              </Flex>
            ))}
          </>
        ) : config?.type === "TARGET" ? (
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
            {config.roleList?.map((role) => (
              <Flex
                key={role}
                pointerEvents={checkRole(role) ? "auto" : "none"}
                opacity={checkRole(role) ? 1 : 0.5}
              >
                <Box flex={1} padding={"5px"}>
                  {currentTargetList?.map((item) => (
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
                  {newTargetList?.map((item, index) => (
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
            {config?.roleList?.map((role) => (
              <Textarea
                key={role}
                size="sm"
                placeholder="Enter comment..."
                border={"none"}
                outline={"none"}
                disabled={!checkRole(role)}
                onChange={(e) =>
                  handleSubmissionValueChange(
                    `${section.formDetailId}_${role}`,
                    section.formDetailId!,
                    role,
                    e.target.value
                  )
                }
              />
            ))}
          </>
        )}
      </Box>
    );
  }
);

export default EvaluationSection;

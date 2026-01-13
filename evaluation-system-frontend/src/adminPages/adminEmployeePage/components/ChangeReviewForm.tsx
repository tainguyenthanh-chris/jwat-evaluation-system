import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  NumberInput,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import type { Employee } from "../../../types/employee";
import type { BossReview } from "../../../types/bossReview";
import type { BossReviewQuery } from "../../../api/bossReviewApi";
import { useBossReview } from "../../../hooks/useBossReview";
import { useAdminEmployeeNameByEmployeeNo } from "../../../hooks/useAdminEmployee";
import SelectOrCreateInput from "../../../components/SelectOrCreateInput";

/** ===== UI TYPE (bossId ổn định cho React key) ===== */
type BossReviewUI = Partial<BossReview> & {
  bossId: string;
};

type Props = {
  employee?: Partial<Employee>;
};

const statusList = [
  { label: "True", value: "T" },
  { label: "False", value: "F" },
];

const roleOptions = [
  { label: "Leader", value: "LEADER" },
  { label: "Manager", value: "MANAGER" },
  { label: "Director", value: "DIRECTOR" },
];

const ChangeReviewerForm: React.FC<Props> = ({ employee }) => {
  if (!employee) return null;

  /** ===== QUERY ===== */
  const bossReviewQuery: BossReviewQuery = {
    employeeNo: employee.employeeNo,
  };
  const { data } = useBossReview(bossReviewQuery);

  /** ===== LOCAL STATE ===== */
  const [bossList, setBossList] = useState<BossReviewUI[]>([]);
  const [selectedBossId, setSelectedBossId] = useState<string | null>(null);

  /** ===== SYNC DATA (gắn bossId ổn định) ===== */
  useEffect(() => {
    if (data) {
      setBossList(
        data.map((b) => ({
          ...b,
          bossId: crypto.randomUUID(),
        }))
      );
    }
  }, [data]);

  /** ===== ORDER HELPERS ===== */
  const normalizeOrder = (list: BossReviewUI[]): BossReviewUI[] =>
    [...list]
      .sort((a, b) => (a.bossReviewOrder ?? 0) - (b.bossReviewOrder ?? 0))
      .map((item, index) => ({
        ...item,
        bossReviewOrder: index + 1,
      }));

  const updateBossOrder = (bossId: string, newOrder: number) => {
    setBossList((prev) =>
      normalizeOrder(
        prev.map((b) =>
          b.bossId === bossId ? { ...b, bossReviewOrder: newOrder } : b
        )
      )
    );
  };

  /** ===== UPDATE HELPERS ===== */
  const updateBoss = (bossId: string, patch: Partial<BossReviewUI>) => {
    setBossList((prev) =>
      prev.map((b) => (b.bossId === bossId ? { ...b, ...patch } : b))
    );
  };

  const setFinalBoss = (bossId: string) => {
    setBossList((prev) =>
      prev.map((b) => ({
        ...b,
        isFinal: b.bossId === bossId ? "T" : "F",
      }))
    );
  };

  const removeBoss = (bossId: string) => {
    setBossList((prev) =>
      normalizeOrder(prev.filter((b) => b.bossId !== bossId))
    );
    if (selectedBossId === bossId) {
      setSelectedBossId(null);
    }
  };

  const addBoss = () => {
    setBossList((prev) =>
      normalizeOrder([
        ...prev,
        {
          bossId: crypto.randomUUID(),
          bossNo: "",
          bossName: "",
          bossReviewOrder: prev.length + 1,
          bossReviewRole: "LEADER",
          isFinal: "F",
        },
      ])
    );
  };

  /** ===== SEARCH BOSS NAME ===== */
  const [searchBossNo, setSearchBossNo] = useState("");
  const { data: bossInfo } = useAdminEmployeeNameByEmployeeNo({
    employeeNo: searchBossNo,
  });

  useEffect(() => {
    if (!bossInfo || !selectedBossId) return;

    updateBoss(selectedBossId, {
      bossName: bossInfo.employeeName,
    });
  }, [bossInfo, selectedBossId]);

  const handleSave = () => {
    console.log("SAVE DATA:", bossList);
    // TODO call mutation API
  };

  /** ===== RENDER ===== */
  return (
    <Box>
      <Heading size="md" mb={4}>
        Change review boss for {employee.employeeName}
      </Heading>

      <Flex justify="right">
        <Text color="blue" cursor="pointer" onClick={addBoss}>
          Add boss
        </Text>
      </Flex>

      {/* HEADER */}
      <Flex
        align="center"
        justify="space-between"
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        p="5px"
        bg="blue.100"
      >
        <Text w="50px">Order</Text>
        <Text flex={1}>Name</Text>
        <Text flex={1}>No</Text>
        <Text w="120px">Role</Text>
        <Text w="60px" fontStyle="italic" color="blue.600">
          Final
        </Text>
      </Flex>

      {bossList.map((item) => {
        const isEditing = item.bossId === selectedBossId;

        return (
          <Box key={item.bossId} my="10px">
            {isEditing ? (
              <>
                <Flex align="center" gap={3}>
                  <NumberInput.Root
                    value={
                      item.bossReviewOrder
                        ? String(item.bossReviewOrder)
                        : undefined
                    }
                    min={1}
                    clampValueOnBlur
                    onValueChange={({ valueAsNumber }) => {
                      if (!Number.isNaN(valueAsNumber)) {
                        updateBossOrder(item.bossId, valueAsNumber);
                      }
                    }}
                  >
                    <NumberInput.Input textAlign="center" />
                  </NumberInput.Root>

                  <Text flex={1}>{item.bossName}</Text>

                  <Input
                    flex={1}
                    size="sm"
                    placeholder="Boss no"
                    value={item.bossNo ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      updateBoss(item.bossId, {
                        bossNo: value,
                        bossName: "",
                      });
                      setSearchBossNo(value);
                    }}
                  />

                  <SelectOrCreateInput
                    options={roleOptions}
                    width="120px"
                    initValue={item.bossReviewRole}
                    onChange={(val) =>
                      updateBoss(item.bossId, {
                        bossReviewRole: val,
                      })
                    }
                  />

                  <RadioGroup.Root
                    value={item.isFinal}
                    onValueChange={(d) => {
                      if (d.value === "T") {
                        setFinalBoss(item.bossId);
                      }
                    }}
                  >
                    <HStack>
                      {statusList.map((s) => (
                        <RadioGroup.Item key={s.value} value={s.value}>
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>{s.label}</RadioGroup.ItemText>
                        </RadioGroup.Item>
                      ))}
                    </HStack>
                  </RadioGroup.Root>
                </Flex>

                <Flex justify="right" mt={2}>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => removeBoss(item.bossId)}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    ml="40px"
                    onClick={() => setSelectedBossId(null)}
                  >
                    Done
                  </Button>
                </Flex>
              </>
            ) : (
              <Flex
                align="center"
                justify="space-between"
                border="1px solid"
                borderColor="gray.300"
                borderRadius="md"
                p="5px"
                cursor="pointer"
                onClick={() => setSelectedBossId(item.bossId)}
              >
                <Text w="50px">{item.bossReviewOrder}</Text>
                <Text flex={1}>{item.bossName}</Text>
                <Text flex={1}>{item.bossNo}</Text>
                <Text w="120px">{item.bossReviewRole}</Text>
                <Text w="60px" color="blue.600">
                  {item.isFinal === "T" ? "Final" : ""}
                </Text>
                <FaEdit />
              </Flex>
            )}
          </Box>
        );
      })}

      <Flex mt={4}>
        <Button bg="blue.700" onClick={handleSave}>
          Save
        </Button>
      </Flex>
    </Box>
  );
};

export default ChangeReviewerForm;

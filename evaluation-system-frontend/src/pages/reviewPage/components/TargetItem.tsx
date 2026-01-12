import {
  Box,
  Flex,
  HStack,
  IconButton,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";

import type { Target } from "../../../types/target";

type Props = {
  item: Partial<Target>;
  onChangeStatus?: (targetId: string, status: Target["targetStatus"]) => void;
  onDelete?: (targetContent: string) => void;
  mode?: "REVIEW" | "HISTORY";
};
const statusList = [
  { label: "Success", value: "SUCCESS" },
  { label: "Fail", value: "FAIL" },
];

const TargetItem: React.FC<Props> = ({
  item,
  onChangeStatus,
  onDelete,
  mode,
}) => {
  if (!item) return;
  const getStatusColor = (value: string) => {
    switch (value) {
      case "SUCCESS":
        return "#98ebb9";
      case "FAIL":
        return "#f38d8d";
      default:
        return "gray.400";
    }
  };
  console.log("mode: " + mode);
  return (
    <Flex align="center" justify="space-between" ml={"10px"} my={"5px"}>
      {item.targetStatus === "NEW" && mode !== "HISTORY" && (
        <IconButton
          colorPalette="red"
          size="sm"
          variant="ghost"
          onClick={() => {
            if (!item.targetContent) return;
            onDelete?.(item.targetContent);
          }}
        >
          <FiTrash2 />
        </IconButton>
      )}
      <Flex
        flex={1}
        align="center"
        justify="space-between"
        ml={"10px"}
        my={"5px"}
      >
        <Box
          border="1px solid"
          borderColor="gray.300"
          borderRadius="md"
          overflow="hidden"
          padding={"5px"}
          bgColor={
            item.targetStatus === "SUCCESS"
              ? "#98ebb9"
              : item.targetStatus === "FAIL"
              ? "#f38d8d"
              : "#f9f6c2"
          }
        >
          {" "}
          <Text>{item.targetContent}</Text>
        </Box>
        {item.targetStatus !== "NEW" && (
          <RadioGroup.Root
            value={item.targetStatus}
            onValueChange={(details) => {
              if (!item.targetId) return;
              onChangeStatus?.(
                item.targetId,
                details.value as Target["targetStatus"]
              );
            }}
            disabled={mode === "HISTORY"}
          >
            <HStack gap="6">
              {statusList.map((item) => (
                <RadioGroup.Item key={item.value} value={item.value}>
                  <RadioGroup.ItemHiddenInput />
                  <RadioGroup.ItemIndicator
                    borderColor={getStatusColor(item.value)}
                    _checked={{
                      bg: getStatusColor(item.value),
                      borderColor: getStatusColor(item.value),
                    }}
                  />
                  <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                </RadioGroup.Item>
              ))}
            </HStack>
          </RadioGroup.Root>
        )}
      </Flex>
    </Flex>
  );
};

export default TargetItem;

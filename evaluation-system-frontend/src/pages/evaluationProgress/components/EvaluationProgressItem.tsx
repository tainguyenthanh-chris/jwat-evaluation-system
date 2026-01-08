import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import type { SubmissionInfo } from "../../../types/submissionInfo";
import type { EvaluationProgressItem } from "../EvaluationProgressPage";

type Props = {
  evaluationProgressItem: Partial<EvaluationProgressItem>;
};

const EvaluationProgressItem: React.FC<Props> = ({
  evaluationProgressItem,
}) => {
  if (!evaluationProgressItem) return;
  const getBgColorByStatus = (value: string) => {
    if (!value) return "gray.400";
    switch (value) {
      case "ALREADY":
        return "#98ebb9";
      case "CAN_REVIEW":
        return "blue.600";
      default:
        return "gray.400";
    }
  };
  const getColorByStatus = (value: string) => {
    if (!value) return "gray.400";
    switch (value) {
      case "ALREADY":
        return "#98ebb9";
      case "CAN_REVIEW":
        return "blue.600";
      default:
        return "gray.400";
    }
  };
  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      overflow="hidden"
      // bg={getBgColorByStatus(evaluationProgressItem?.status)}
    >
      <Text fontWeight="semibold" color="blue.700">
        {evaluationProgressItem.employeeName}
      </Text>
      <Text fontWeight="semibold" color="blue.700">
        {evaluationProgressItem.reviewDate}
      </Text>
      {/* <Text fontWeight="semibold" color="blue.700">
        {evaluationProgressItem.}
      </Text> */}
    </Box>
  );
};

export default EvaluationProgressItem;

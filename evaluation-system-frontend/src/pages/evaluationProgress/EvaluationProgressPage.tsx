import { Box, Heading, Text } from "@chakra-ui/react";

export type EvaluationProgressItem = {
  employeeNo: string;
  employeeName: string;
  reviewDate: string;
  status: "CAN_REVIEW" | "NOT_YET" | "ALREADY";
};

const EvaluationProgressPage = () => {
  return (
    <Box
      maxW="1200px"
      mx="auto"
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading>Evaluation Progress</Heading>
    </Box>
  );
};

export default EvaluationProgressPage;

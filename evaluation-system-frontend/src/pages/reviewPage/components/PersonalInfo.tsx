import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import type { SubmissionInfo } from "../../../types/submissionInfo";

type Props = {
  submissionInfo: Partial<SubmissionInfo>;
};

const PersonalInfo: React.FC<Props> = ({ submissionInfo }) => {
  const InfoCell = ({
    label,
    value,
  }: {
    label: string;
    value?: React.ReactNode;
  }) => (
    <GridItem p={2} border="1px solid" borderColor="gray.300">
      <Text as="span" fontWeight="medium">
        {label}:
      </Text>{" "}
      {value ?? "-"}
    </GridItem>
  );
  return (
    <Box
      border="1px solid"
      borderColor="gray.300"
      borderRadius="md"
      overflow="hidden"
    >
      <Box bg="blue.50" px={4} py={2}>
        <Text fontWeight="semibold" color="blue.700">
          Personal Information
        </Text>
      </Box>

      <Grid templateColumns="1fr 1fr" fontSize="sm">
        <InfoCell label="Full name" value={submissionInfo.employeeName} />
        <InfoCell
          label="Review by"
          value={submissionInfo.reviewers?.map((r) => r.bossName).join(", ")}
        />

        <InfoCell label="Employee code" value={submissionInfo.employeeNo} />
        <InfoCell label="Review date" value={submissionInfo.reviewDate} />

        <InfoCell
          label="Info"
          value={`${submissionInfo.department} - ${submissionInfo.position} - ${submissionInfo.level}`}
        />
        <InfoCell
          label="Next review date"
          value={submissionInfo.nextReviewDate}
        />
      </Grid>
    </Box>
  );
};

export default PersonalInfo;

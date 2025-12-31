import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import type { Employee } from "../../../types/employee";

type Props = {
  employee: Partial<Employee>;
};

const PersonalInfo: React.FC<Props> = ({ employee }) => {
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
        <InfoCell label="Full name" value={employee.employeeName} />
        <InfoCell
          label="Review by"
          value={employee.reviewers?.map((r) => r.employeeName).join(", ")}
        />

        <InfoCell label="Employee code" value={employee.employeeCode} />
        <InfoCell label="Review date" value={employee.reviewDate} />

        <InfoCell label="Info" value={employee.position} />
        <InfoCell label="Next review date" value={employee.nextReviewDate} />
      </Grid>
    </Box>
  );
};

export default PersonalInfo;

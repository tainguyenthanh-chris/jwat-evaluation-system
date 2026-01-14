import { Flex, Grid, Heading, IconButton, Text } from "@chakra-ui/react";
import AppCard from "../../components/AppCard";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EvaluationProgressItem from "./components/EvaluationProgressItem";
import type { AdminReviewingEmployeeQuery } from "../../api/adminEvaluationProgress";
import { useAdminReviewingEmployee } from "../../hooks/useAdminReviewingEmployee";

export interface EmployeeProgress {
  employeeName: string;
  employeeNo: string;
  formSubmissionStatus: "REMIND" | "BOSS_REVIEWED" | "EMPLOYEE_REVIEWED";
  reviewOn?: string;
  reviewDueDate?: string;
}

const EvaluationProgressPage = () => {
  const navigate = useNavigate();

  const adminReviewingEmployeeQuery: AdminReviewingEmployeeQuery = {
    bossNo: "258400",
  };
  const { data } = useAdminReviewingEmployee(adminReviewingEmployeeQuery);
  console.log("Data: " + JSON.stringify(data, null, 2));

  const handleReviewClick = (employeeNo: string) => {
    navigate(`/review/employee/${employeeNo}`);
  };

  const handleRemindClick = (employeeNo: string) => {
    // console.log("Sending reminder to employee:", employeeNo);
    // navigate(`/review/employee/${employeeNo}`);
  };

  return (
    <AppCard>
      <Flex alignItems="center" justifyContent="space-between" gap="16px">
        <Flex alignItems="center" gap="16px">
          <IconButton variant="ghost" onClick={() => navigate("/")}>
            <FaArrowLeft />
          </IconButton>
          <Heading>Review Progress</Heading>
        </Flex>
      </Flex>

      {data?.length === 0 ? (
        <Flex justifyContent="center" alignItems="center" minHeight="160px">
          <Text color={"fg.muted"}>Data not found</Text>
        </Flex>
      ) : (
        <Grid
          templateColumns={{
            base: "12fr",
            sm: "6fr 6fr",
            md: "4fr 4fr 4fr",
            lg: "3fr 3fr 3fr 3fr",
          }}
          gap="24px"
        >
          {data?.map((employee) => (
            <EvaluationProgressItem
              key={employee.employeeNo}
              employeeProgress={employee}
              onReviewClick={() => handleReviewClick(employee.employeeNo)}
              onRemindClick={() => handleRemindClick(employee.employeeNo)}
            />
          ))}
        </Grid>
      )}
    </AppCard>
  );
};

export default EvaluationProgressPage;

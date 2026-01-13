import { Flex, Grid, Heading, IconButton, Text } from "@chakra-ui/react";
import AppCard from "../../components/AppCard";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EvaluationProgressItem from "./components/EvaluationProgressItem";

export interface EmployeeProgress {
  employeeName: string;
  employeeNumber: string;
  formSubmissionStatus: "REMIND" | "BOSS_REVIEWED" | "EMPLOYEED_REVIEWED";
  reviewOn?: string;
  reviewDueDate?: string;
}

const EvaluationProgressPage = () => {
  const navigate = useNavigate();

  const mockData: EmployeeProgress[] = [
    {
      employeeName: "Tô Minh Nhật",
      employeeNumber: "001",
      formSubmissionStatus: "EMPLOYEED_REVIEWED",
      reviewOn: "14/12/2025",
    },
    {
      employeeName: "Hoàng Mạnh Hà",
      employeeNumber: "002",
      formSubmissionStatus: "REMIND",
      reviewDueDate: "16/12/2025",
    },
    {
      employeeName: "Nguyễn Thành Tài",
      employeeNumber: "003",
      formSubmissionStatus: "EMPLOYEED_REVIEWED",
      reviewOn: "12/12/2025",
    },
    {
      employeeName: "Bảo Thiên",
      employeeNumber: "004",
      formSubmissionStatus: "REMIND",
      reviewDueDate: "16/12/2025",
    },
    {
      employeeName: "Duy",
      employeeNumber: "005",
      formSubmissionStatus: "REMIND",
      reviewDueDate: "16/12/2025",
    },
    {
      employeeName: "Phú Gia",
      employeeNumber: "006",
      formSubmissionStatus: "BOSS_REVIEWED",
      reviewOn: "15/12/2025",
    },
  ];

  const handleReviewClick = (employeeNumber: string) => {
    navigate(`/review/employee/${employeeNumber}`);
  };

  const handleRemindClick = (employeeNumber: string) => {
    console.log("Sending reminder to employee:", employeeNumber);
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

      {mockData.length === 0 ? (
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
          {mockData.map((employee) => (
            <EvaluationProgressItem
              key={employee.employeeNumber}
              employeeProgress={employee}
              onReviewClick={() => handleReviewClick(employee.employeeNumber)}
              onRemindClick={() => handleRemindClick(employee.employeeNumber)}
            />
          ))}
        </Grid>
      )}
    </AppCard>
  );
};

export default EvaluationProgressPage;

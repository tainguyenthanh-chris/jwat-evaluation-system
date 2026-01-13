import { Button, Card, Text } from "@chakra-ui/react";
import type { EmployeeProgress } from "../EvaluationProgressPage";

interface EvaluationProgressItemProps {
  employeeProgress: EmployeeProgress;
  onReviewClick: () => void;
  onRemindClick: () => void;
}

const EvaluationProgressItem = ({
  employeeProgress,
  onReviewClick,
  onRemindClick,
}: EvaluationProgressItemProps) => {
  const { employeeName, formSubmissionStatus, reviewOn, reviewDueDate } =
    employeeProgress;

  const getCardStyle = () => {
    switch (formSubmissionStatus) {
      case "EMPLOYEE_REVIEWED":
        return {
          borderColor: "#4CAF50",
        };
      case "BOSS_REVIEWED":
        return {
          borderColor: "#2196F3",
        };
      case "REMIND":
      default:
        return {
          borderColor: "#FF9800",
        };
    }
  };

  const renderButton = () => {
    if (formSubmissionStatus === "EMPLOYEE_REVIEWED") {
      return (
        <Button
          colorPalette={"green"}
          size={"sm"}
          onClick={onReviewClick}
          width="full"
        >
          Review now
        </Button>
      );
    } else if (formSubmissionStatus === "BOSS_REVIEWED") {
      return <Text color={"fg.muted"}>You reviewd</Text>;
    } else {
      return (
        <Button
          colorPalette={"orange"}
          size={"sm"}
          onClick={onRemindClick}
          width="full"
        >
          Remind
        </Button>
      );
    }
  };

  const renderDateInfo = () => {
    if (reviewOn) {
      return (
        <Text as="span" fontSize="sm" fontStyle="italic">
          Reviewed on: {reviewOn}
        </Text>
      );
    }
    if (reviewDueDate) {
      return (
        <Text as="span" fontSize="sm" fontStyle="italic">
          Due date: {reviewDueDate}
        </Text>
      );
    }
    return null;
  };

  return (
    <Card.Root {...getCardStyle()}>
      <Card.Body gap="2">
        <Card.Title mt="2" fontSize="lg" fontWeight="bold">
          {employeeName}
        </Card.Title>
        <Card.Description>{renderDateInfo()}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="center" pt="0">
        {renderButton()}
      </Card.Footer>
    </Card.Root>
  );
};

export default EvaluationProgressItem;

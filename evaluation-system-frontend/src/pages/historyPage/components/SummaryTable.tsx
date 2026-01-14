import { Box, Heading, Table, Text } from "@chakra-ui/react";
import type { SummaryItem } from "../../../types/summaryTable";
import { calcGrade } from "../../reviewPage/components/EvaluationSection";
import { useNavigate } from "react-router-dom";

type Props = {
  formSubmissionId: string;
  reviewDate: string;
  summaryData: SummaryItem[];
  formSubmissionStatus: string;
};

export function getStatus(formSubmissionStatus?: string): string {
  if (!formSubmissionStatus) return "Next reviewer: No information";
  if (formSubmissionStatus === "PENDING") return "Next reviewer: Employee";
  if (formSubmissionStatus === "FINAL") return "Final";
  return "Next reviewer: " + formSubmissionStatus;
}

const getComment = (grade?: string) => {
  console.log(grade);
  if (!grade) return "No infomation";
  switch (grade) {
    case "S":
      return "Exceeds Expectation (Excellent)";
    case "A":
      return "Meets Expectation (Good)";
    case "B":
    case "C":
    case "D":
      return "Needs Improvement";
    default:
      return "Needs Improvement";
  }
};

const calcAvgFinal = (
  summaryData: { summaryPoint: number | string | null }[]
): number | null => {
  const values = summaryData
    .map((item) => Number(item.summaryPoint))
    .filter((v) => Number.isFinite(v));

  if (values.length === 0) return null;

  const sum = values.reduce((acc, v) => acc + v, 0);
  return Number((sum / values.length).toFixed(2));
};

const SummaryTable: React.FC<Props> = ({
  formSubmissionId,
  reviewDate,
  summaryData,
  formSubmissionStatus,
}) => {
  const avgFinal = calcAvgFinal(summaryData);
  // const finalLeaderGrade: string | null = null;
  const navigate = useNavigate();

  return (
    <Box
      border="1px solid"
      borderColor="gray.400"
      mb={"40px"}
      borderRadius={"sm"}
      overflow={"hidden"}
      cursor={"pointer"}
      _hover={{
        boxShadow: "md",
      }}
      onClick={() => navigate(`/history/${formSubmissionId}`)}
    >
      <Table.Root size="sm">
        {/* ================= HEADER ================= */}
        <Table.Header>
          {/* TITLE */}
          <Table.Row
            bg={formSubmissionStatus !== "FINAL" ? "green.200" : "white"}
          >
            <Table.Cell colSpan={summaryData.length + 2} textAlign="center">
              <Text color="blue.900" fontWeight="bold" fontSize="lg">
                SUMMARY {reviewDate}{" "}
                <Text
                  as="span"
                  fontSize="sm"
                  fontWeight="normal"
                  color="blue.900"
                  ml={2}
                  fontStyle={"italic"}
                >
                  ({getStatus(formSubmissionStatus)})
                </Text>
              </Text>
            </Table.Cell>
          </Table.Row>

          {/* SECTION HEADERS + FINAL PERFORMANCE */}
          <Table.Row bg="blue.100">
            {summaryData.map((item) => (
              <Table.Cell
                key={item.sectionTitle}
                textAlign="center"
                border="1px solid"
                borderColor="gray.400"
                fontWeight="bold"
                textTransform="uppercase"
              >
                {item.sectionTitle}
              </Table.Cell>
            ))}

            <Table.Cell
              colSpan={2}
              textAlign="center"
              border="1px solid"
              borderColor="gray.400"
              fontWeight="bold"
              textTransform="uppercase"
            >
              FINAL PERFORMANCE RATING
            </Table.Cell>
          </Table.Row>
        </Table.Header>

        {/* ================= BODY ================= */}
        <Table.Body>
          {/* ===== GRADE ROW ===== */}
          <Table.Row>
            {summaryData.map((item) => {
              const grade = calcGrade(item.summaryPoint);
              return (
                <Table.Cell
                  key={item.sectionTitle}
                  textAlign="center"
                  border="1px solid"
                  borderColor="gray.400"
                >
                  <Text fontWeight="bold" color="blue.600">
                    {grade}
                  </Text>
                </Table.Cell>
              );
            })}

            <Table.Cell
              textAlign="center"
              border="1px solid"
              borderColor="gray.400"
              fontWeight="bold"
              color="blue.600"
              rowSpan={2}
              width="120px"
            >
              {calcGrade(avgFinal) ?? "No information"}
            </Table.Cell>

            <Table.Cell
              textAlign="center"
              border="1px solid"
              borderColor="gray.400"
              fontWeight="bold"
              color="red.600"
              rowSpan={2}
            >
              {getComment(calcGrade(avgFinal)) ?? "No information"}
            </Table.Cell>
          </Table.Row>

          {/* ===== COMMENT ROW ===== */}
          <Table.Row>
            {summaryData.map((item) => {
              const grade = calcGrade(item.summaryPoint);
              return (
                <Table.Cell
                  key={item.sectionTitle}
                  textAlign="center"
                  border="1px solid"
                  borderColor="gray.400"
                  fontStyle="italic"
                >
                  {getComment(grade)}
                </Table.Cell>
              );
            })}

            {/* <Table.Cell
              textAlign="center"
              border="1px solid"
              borderColor="gray.400"
              fontStyle="italic"
              rowSpan={2}
            >
              {getComment(finalSelfGrade ?? "GRADE")}
            </Table.Cell>

            <Table.Cell
              textAlign="center"
              border="1px solid"
              borderColor="gray.400"
              fontStyle="italic"
              rowSpan={2}
            >
              {getComment(finalLeaderGrade ?? "GRADE")}
            </Table.Cell> */}
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default SummaryTable;

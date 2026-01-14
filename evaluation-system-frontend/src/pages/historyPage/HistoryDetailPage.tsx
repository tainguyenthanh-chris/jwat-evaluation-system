import { Box, Heading } from "@chakra-ui/react";
import SummaryTable from "./components/SummaryTable";
import { useEvaluation, type EvaluationQuery } from "../../hooks/useEvaluation";
import { useNavigate, useParams } from "react-router-dom";
import EvaluationSection from "../reviewPage/components/EvaluationSection";
import { useEffect } from "react";
import type { SubmissionInfo } from "../../types/submissionInfo";
import type { BossReview } from "../../types/bossReview";
import PersonalInfo from "../reviewPage/components/PersonalInfo";

// type Props = {
//   formSubmissionId: string;
// };

const HistoryDetailPage = () => {
  const { formSubmissionId } = useParams<{ formSubmissionId: string }>();

  const query: EvaluationQuery = {
    formSubmissionId,
  };
  console.log("EvaluationQuery:" + JSON.stringify(query, null, 2));

  const { data } = useEvaluation(query);
  useEffect(() => {
    console.log("HistoryDetailPage:" + data);
  }, [data]);
  const formTemplate = data?.formTemplate;
  const newTargetList = data?.newTargetList;
  const currentTargetList = data?.currentTargetList;
  const submissionValueMapOfficial = data?.submissionValueMap;
  const reviewBossList: Partial<BossReview>[] = (data?.reviewBy ?? []).map(
    (boss) => ({
      bossName: boss.bossName ?? "",
      bossNo: boss.bossNo ?? "",
    })
  );
  const submissionInfo: Partial<SubmissionInfo> = {
    formSubmissionId: data?.formSubmissionId,
    employeeName: data?.employeeName,
    employeeNo: data?.employeeNo,
    department: data?.employeeCurrentDepartmentCode,
    position: data?.employeeCurrentPositionCode,
    level: data?.employeeCurrentLevelCode,
    reviewDate: data?.reviewDate,
    reviewers: reviewBossList,
    nextReviewDate: data?.nextReviewDate,
  };
  return (
    <Box
      maxW="1200px"
      mx="auto"
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading>Evaluation History</Heading>
      <Box mt={"40px"}>
        <PersonalInfo submissionInfo={submissionInfo} />
        {formTemplate?.sectionList?.map((section) => (
          <EvaluationSection
            key={section.formDetailId}
            section={section}
            newTargetList={
              section.config?.configType === "TARGET" ? newTargetList : []
            }
            currentTargetList={
              section.config?.configType === "TARGET" ? currentTargetList : []
            }
            submissionValueMap={submissionValueMapOfficial}
            mode="HISTORY"
          />
        ))}
      </Box>
    </Box>
  );
};

export default HistoryDetailPage;

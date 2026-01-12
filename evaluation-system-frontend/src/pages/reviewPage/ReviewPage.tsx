import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import type { Target } from "../../types/target";
import PersonalInfo from "./components/PersonalInfo";
import type { SubmissionInfo } from "../../types/submissionInfo";
import EvaluationSection, {
  type SectionRef,
} from "./components/EvaluationSection";
import type { SubmissionValue } from "../../types/submissionValue";
import {
  useEvaluation,
  useSubmitEvaluation,
  type EvaluationQuery,
} from "../../hooks/useEvaluation";
import type { BossReview } from "../../types/bossReview";
import ConfirmDialog from "../../components/dialog/ConfirmDialog";

export type SubmitEvaluationPayload = {
  formSubmissionId: string;
  submissionValueList: SubmissionValue[];
  newTargetList: Partial<Target>[];
  currentTargetList: Partial<Target>[];
  summarySubmissionList: Partial<SummarySubmission>[];
};

export type SummarySubmission = {
  summarySubmissionId?: string;
  sectionTitle: string;
  summaryPoint: string;
  summaryGrade: string;
  summaryOrderNo: number;
};

const ReviewPage = () => {
  const query: EvaluationQuery = {
    employeeNo: "258157",
    mode: "REVIEW",
  };

  const { data } = useEvaluation(query);
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

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

  const formTemplate = data?.formTemplate;

  const newTargetList = data?.newTargetList;
  const currentTargetList = data?.currentTargetList;

  const user = {
    revRoleList: "SELF",
  };

  const sectionRefs = useRef<Record<string, SectionRef | null>>({});

  const submissionValueMapOfficial = data?.submissionValueMap;
  const submitMutation = useSubmitEvaluation();

  const handleSubmit = () => {
    console.log("handleSubmit");

    const data = Object.values(sectionRefs.current)
      .map((ref) => ref?.getData())
      .filter(Boolean);

    const errorSection = data.find((d) => d.error);
    if (errorSection) {
      // toast.warning(errorSection.message ?? "Invalid input");
      alert(errorSection.message ?? "Invalid input");
      return;
    }

    // const submissionValueList: SubmissionValue[] = Object.values(
    //   sectionRefs.current
    // ).flatMap((ref) =>
    //   Object.values(ref?.getData().submissionValueMapLocal ?? {})
    // );
    const submissionValueList: SubmissionValue[] = data.flatMap((d) =>
      Object.values(d.submissionValueMapLocal ?? {})
    );

    // const newTargetList: Partial<Target>[] = Object.values(
    //   sectionRefs.current
    // ).flatMap((ref) => ref?.getData().newTargetListLocal ?? []);

    const newTargetList: Partial<Target>[] = data.flatMap(
      (d) => d.newTargetListLocal ?? []
    );

    // const currentTargetList: Partial<Target>[] = Object.values(
    //   sectionRefs.current
    // ).flatMap((ref) => ref?.getData().currentTargetListLocal ?? []);
    const currentTargetList: Partial<Target>[] = data.flatMap(
      (d) => d.currentTargetListLocal ?? []
    );

    // const summarySubmissionList: Partial<SummarySubmission>[] = Object.values(
    //   sectionRefs.current
    // )
    //   .map((ref) => ref?.getData().summarySubmission)
    //   .filter((s): s is SummarySubmission => !!s && s.summaryPoint !== null);
    const summarySubmissionList: Partial<SummarySubmission>[] = data
      .map((d) => d.summarySubmission)
      .filter((s): s is SummarySubmission => !!s && s.summaryPoint !== null);

    const payload: SubmitEvaluationPayload = {
      submissionValueList,
      newTargetList,
      currentTargetList,
      formSubmissionId: submissionInfo.formSubmissionId!,
      summarySubmissionList: summarySubmissionList,
    };
    console.log("SUBMIT PAYLOAD:", payload);
    submitMutation.mutate(payload);
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
      <Heading textAlign={"center"}>Review</Heading>
      <PersonalInfo submissionInfo={submissionInfo} />

      {formTemplate?.sectionList?.map((section) => (
        <EvaluationSection
          role={user.revRoleList}
          key={section.formDetailId}
          section={section}
          ref={(el) => {
            sectionRefs.current[section.formDetailId] = el;
          }}
          newTargetList={
            section.config?.configType === "TARGET" ? newTargetList : []
          }
          currentTargetList={
            section.config?.configType === "TARGET" ? currentTargetList : []
          }
          submissionValueMap={submissionValueMapOfficial}
        />
      ))}
      <Flex>
        <ConfirmDialog
          triggerButtonTitle="Submit"
          title="Submit form"
          secondaryTitle="After submit, you cannot update any more?"
          onConfirm={handleSubmit}
          triggerButtonProps={{ colorScheme: "red" }}
        />
      </Flex>
    </Box>
  );
};

export default ReviewPage;

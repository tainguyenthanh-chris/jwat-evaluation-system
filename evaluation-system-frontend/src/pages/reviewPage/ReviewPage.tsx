import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import SelectOrCreateInput from "../../components/SelectOrCreateInput";
import { useAuthStore } from "../../store/authStore";

export type SubmitEvaluationPayload = {
  formSubmissionId: string;
  submissionValueList: SubmissionValue[];
  newTargetList: Partial<Target>[];
  currentTargetList: Partial<Target>[];
  summarySubmissionList: Partial<SummarySubmission>[];
  newLevel: string;
  employeeNo: string;
};

export type SummarySubmission = {
  summarySubmissionId?: string;
  sectionTitle: string;
  summaryPoint: string;
  summaryGrade: string;
  summaryOrderNo: number;
};

const levelOptions = [
  { label: "Fresher", value: "FRESHER" },
  { label: "Fresher 2", value: "FRESHER 2" },
  { label: "Fresher 3", value: "FRESHER 3" },
  { label: "Fresher 4", value: "FRESHER 4" },
  { label: "Junior", value: "JUNIOR" },
  { label: "Senior", value: "SENIOR" },
];

const ReviewPage = () => {
  useEffect(() => {
    document.title = "Review";
  }, []);
  const { employeeNo } = useParams<{
    employeeNo: string;
  }>();
  const query: EvaluationQuery = {
    employeeNo: employeeNo,
    mode: "REVIEW",
  };
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useEvaluation(query);
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
    submissionStatus: data?.submissionStatus ?? "",
  };

  const formTemplate = data?.formTemplate;

  const newTargetList = data?.newTargetList;
  const currentTargetList = data?.currentTargetList;

  const user = {
    revRoleList: data?.revRoleList ?? "",
  };

  const sectionRefs = useRef<Record<string, SectionRef | null>>({});

  const submissionValueMapOfficial = data?.submissionValueMap;
  const submitMutation = useSubmitEvaluation();
  const [newLevel, setNewLevel] = useState<string>("");
  const handleSubmit = async () => {
    const data = Object.values(sectionRefs.current)
      .map((ref) => ref?.getData())
      .filter(Boolean);

    const errorSection = data.find((d) => d.error);
    if (errorSection) {
      // toast.warning(errorSection.message ?? "Invalid input");
      alert(errorSection.message ?? "Please fill all fields");
      return;
    }

    const submissionValueList: SubmissionValue[] = data.flatMap((d) =>
      Object.values(d.submissionValueMapLocal ?? {})
    );

    const newTargetList: Partial<Target>[] = data.flatMap(
      (d) => d.newTargetListLocal ?? []
    );

    const currentTargetList: Partial<Target>[] = data.flatMap(
      (d) => d.currentTargetListLocal ?? []
    );

    const summarySubmissionList: Partial<SummarySubmission>[] = data
      .map((d) => d.summarySubmission)
      .filter((s): s is SummarySubmission => !!s && s.summaryPoint !== null);

    const payload: SubmitEvaluationPayload = {
      submissionValueList,
      newTargetList,
      currentTargetList,
      formSubmissionId: submissionInfo.formSubmissionId!,
      summarySubmissionList: summarySubmissionList,
      newLevel,
      employeeNo: submissionInfo.employeeNo ?? "",
    };
    // console.log("payload: " + JSON.stringify(payload, null, 2));
    try {
      await submitMutation.mutateAsync(payload);
      navigate("/history");
    } catch (e) {
      console.error(e);
    }
  };

  if (isError) {
    const message =
      (error as any)?.response?.data?.message || "Load evaluation failed";
    return <Box>{message}</Box>;
  }

  const canSubmit = () => {
    if (
      user.revRoleList === "SELF" &&
      submissionInfo.submissionStatus === "PENDING"
    )
      return true;
    if (user.revRoleList === submissionInfo.submissionStatus) return true;
    return false;
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
      {user.revRoleList.includes("LEADER") && (
        <Flex align={"center"} justify={"center"}>
          <Box>
            {" "}
            <Text fontWeight={"sm"}>Current level</Text>
            <Box
              bg="blue.50"
              px={4}
              py={2}
              fontWeight="semibold"
              color="blue.700"
              overflow={"visible"}
            >
              {" "}
              <Text>{submissionInfo.level}</Text>
            </Box>
          </Box>
          <Box mx={"20px"}>
            <FaArrowRight />
          </Box>
          <Box>
            <SelectOrCreateInput
              options={levelOptions}
              placeholder="Select or type level"
              onSubmit={(val) => {
                setNewLevel(val);
              }}
            />
          </Box>
        </Flex>
      )}
      {canSubmit() && (
        <Flex>
          <ConfirmDialog
            triggerButtonTitle="Submit"
            title="Submit form"
            secondaryTitle="After submit, you cannot update any more?"
            onConfirm={handleSubmit}
            triggerButtonProps={{ colorScheme: "red" }}
          />
        </Flex>
      )}
    </Box>
  );
};

export default ReviewPage;

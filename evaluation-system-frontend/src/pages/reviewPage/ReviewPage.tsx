import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { useRef } from "react";
import type { Target } from "../../types/target";
import PersonalInfo from "./components/PersonalInfo";
import type { Employee } from "../../types/employee";
import EvaluationSection, {
  type SectionRef,
} from "./components/EvaluationSection";
import type { Section } from "../../types/section";
import type { SubmissionValue } from "../../types/submissionValue";

type FormTemplate = {
  departmentCode: string;
  positionCode: string;
  levelCode: string;
  sectionList?: Section[];
};

const ReviewPage = () => {
  const boss: Partial<Employee>[] = [
    {
      employeeName: "Nguyen Toan",
      employeeCode: "111111",
    },
    {
      employeeName: "Le An",
      employeeCode: "222222",
    },
    {
      employeeName: "Kham Vu",
      employeeCode: "666666",
    },
  ];
  const employeeInfo: Partial<Employee> = {
    employeeName: "To Minh Nhat",
    employeeCode: "257158",
    position: "Dev - Middle",
    reviewDate: "6/2025",
    department: "IT",
    reviewers: boss,
    nextReviewDate: "12/2025",
  };

  //   const { data } = useQuery({
  //     queryKey: ["getTarget"],
  //     queryFn: getTarget,
  //   });

  const formTemplate: Partial<FormTemplate> = {
    departmentCode: "IT",
    positionCode: "DEV",
    levelCode: "FRESHER",
    sectionList: [
      {
        formDetailId: "1",
        sectionTitle: "General Evaluation",
        config: {
          type: "POINT",
          roleList: ["SELF", "LEADER"],
        },
        criteriaList: [
          {
            formDetailId: "2",
            criteriaContent: "Background knowledge",
          },
          {
            formDetailId: "3",
            criteriaContent: "as good thinking method & problem solving skills",
          },
          {
            formDetailId: "4",
            criteriaContent: "Cowork with leader",
          },
        ],
      },
      {
        formDetailId: "5",
        sectionTitle: "Customer Satisfaction",
        config: {
          type: "POINT",
          roleList: ["SELF", "LEADER"],
        },
        criteriaList: [
          {
            formDetailId: "6",
            criteriaContent: "Proactive to find new tasks",
          },
          {
            formDetailId: "7",
            criteriaContent: "Having suitable attitude in any situation",
          },
          {
            formDetailId: "8",
            criteriaContent: "Responsibility",
          },
        ],
      },
      {
        formDetailId: "9",
        sectionTitle: "Objectives",
        config: {
          type: "COMMENT",
          roleList: ["SELF"],
        },
      },
      {
        formDetailId: "10",
        sectionTitle: "Achievements",
        config: {
          type: "COMMENT",
          roleList: ["LEADER"],
        },
      },
      {
        formDetailId: "11",
        sectionTitle: "Conclusion & Recommendation of the 1st Line Manager",
        config: {
          type: "TARGET",
          roleList: ["LEADER"],
        },
        targetList: [
          {
            targetId: "1",
            formDetailId: "11",
            targetOrderNo: 1,
            targetContent: "Ielts 7.0",
            targetStatus: "WAIT",
          },
          {
            targetId: "2",
            formDetailId: "11",
            targetOrderNo: 2,
            targetContent: "Join 10 projects",
            targetStatus: "WAIT",
          },
        ],
      },
    ],
  };

  const targetList: Partial<Target>[] = [
    {
      targetId: "1",
      formDetailId: "11",
      targetOrderNo: 1,
      targetContent: "Ielts 7.0",
      targetStatus: "WAIT",
    },
    {
      targetId: "2",
      formDetailId: "11",
      targetOrderNo: 2,
      targetContent: "Join 10 projects",
      targetStatus: "WAIT",
    },
  ];
  const user = {
    revRoleList: "LEADER",
  };
  const formSubmission = {
    formSubmissionId: "form_subm20250101001",
  };
  const sectionRefs = useRef<Record<string, SectionRef | null>>({});

  const handleSubmit = () => {
    const submissionValueList: SubmissionValue[] = Object.values(
      sectionRefs.current
    ).flatMap((ref) => Object.values(ref?.getData().submissionValueMap ?? {}));

    const newTargetList: Partial<Target>[] = Object.values(
      sectionRefs.current
    ).flatMap((ref) => ref?.getData().newTargetList ?? []);

    const currentTargetList: Partial<Target>[] = Object.values(
      sectionRefs.current
    ).flatMap((ref) => ref?.getData().currentTargetList ?? []);

    const payload = {
      submissionValueList,
      newTargetList,
      currentTargetList,
      formSubmissionId: formSubmission.formSubmissionId,
    };

    console.log("SUBMIT PAYLOAD:", payload);
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
      <PersonalInfo employee={employeeInfo} />

      {formTemplate.sectionList?.map((section) => (
        <EvaluationSection
          role={user.revRoleList}
          key={section.formDetailId}
          section={section}
          ref={(el) => {
            sectionRefs.current[section.formDetailId] = el;
          }}
          targetList={section.config?.type === "TARGET" ? targetList : []}
        />
      ))}
      <Flex>
        <Button
          mt={6}
          colorScheme="blue"
          loadingText="Submitting..."
          onClick={handleSubmit}
          bgColor={"blue.700"}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default ReviewPage;

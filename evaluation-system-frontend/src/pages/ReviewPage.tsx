import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Table,
  Text,
  Badge,
  Textarea,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  employeeInfo: EmployeeInfo;
};

type EmployeeInfo = {
  employeeName: string;
  employeeCode: string;
  position: string;
  reviewDate: string;
  department: string;
  reviewers: Partial<EmployeeInfo>[];
  nextReviewDate: string;
};

type Config = {
  type: string;
  roleList: string[];
};

type Section = {
  detailId: string;
  sectionTitle: string;
  config?: {
    type?: string;
    roleList?: string[];
  };
  criteriaList?: Criteria[];
};

type Criteria = {
  detailId: string;
  criteriaContent: string;
};

type FormTemplate = {
  departmentCode: string;
  positionCode: string;
  levelCode: string;
  sectionList?: Section[];
};

const ReviewPage = () => {
  const user = {
    rev_role: "SELF",
  };
  const boss: Partial<EmployeeInfo>[] = [
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
  const employeeInfo: Partial<EmployeeInfo> = {
    employeeName: "To Minh Nhat",
    employeeCode: "257158",
    position: "Dev - Middle",
    reviewDate: "6/2025",
    department: "IT",
    reviewers: boss,
    nextReviewDate: "12/2025",
  };

  list: [
    {
      formSubmId: "submit001", //giong nhau
      detailId: "detial001",
      submitValueRole: "SELF",
      submitValue: "10",
    },
    {
      formSubmId: "submit001", //giong nhau
      detailId: "detial002",
      submitValueRole: "SELF",
      submitValue: "10",
    },
  ];

  const formTemplate: Partial<FormTemplate> = {
    departmentCode: "IT",
    positionCode: "DEV",
    levelCode: "FRESHER",
    sectionList: [
      {
        detailId: "1",
        sectionTitle: "General Evaluation",
        config: {
          type: "POINT",
          roleList: ["SELF", "LEADER"],
        },
        criteriaList: [
          {
            detailId: "2",
            criteriaContent: "Background knowledge",
          },
          {
            detailId: "3",
            criteriaContent: "as good thinking method & problem solving skills",
          },
          {
            detailId: "4",
            criteriaContent: "Cowork with leader",
          },
        ],
      },
      {
        detailId: "5",
        sectionTitle: "Customer Satisfaction",
        config: {
          type: "POINT",
          roleList: ["SELF", "LEADER"],
        },
        criteriaList: [
          {
            detailId: "6",
            criteriaContent: "Proactive to find new tasks",
          },
          {
            detailId: "7",
            criteriaContent: "Having suitable attitude in any situation",
          },
          {
            detailId: "8",
            criteriaContent: "Responsibility",
          },
        ],
      },
      {
        detailId: "9",
        sectionTitle: "Objectives",
        config: {
          type: "COMMENT",
          roleList: ["SELF"],
        },
      },
      {
        detailId: "10",
        sectionTitle: "Achievements",
        config: {
          type: "COMMENT",
          roleList: ["LEADER"],
        },
      },
      {
        detailId: "11",
        sectionTitle: "Conclusion & Recommendation of the 1st Line Manager",
        config: {
          type: "TARGET",
          roleList: ["LEADER"],
        },
      },
    ],
  };

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

  const PersonalInfo: React.FC<Props> = ({ employeeInfo }) => {
    return (
      <Box
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        overflow="hidden"
      >
        {/* Header */}
        <Box bg="blue.50" px={4} py={2}>
          <Text fontWeight="semibold" color="blue.700">
            Personal Information
          </Text>
        </Box>

        {/* Content */}
        <Grid templateColumns="1fr 1fr" fontSize="sm">
          <InfoCell label="Full name" value={employeeInfo.employeeName} />
          <InfoCell
            label="Review by"
            value={employeeInfo.reviewers
              ?.map((r) => r.employeeName)
              .join(", ")}
          />

          <InfoCell label="Employee code" value={employeeInfo.employeeCode} />
          <InfoCell label="Review date" value={employeeInfo.reviewDate} />

          <InfoCell label="Info" value={employeeInfo.position} />
          <InfoCell
            label="Next review date"
            value={employeeInfo.nextReviewDate}
          />
        </Grid>
      </Box>
    );
  };

  type SectionProps = {
    section: Section;
  };

  const EvaluationSection: React.FC<SectionProps> = ({ section }) => {
    const config = section.config;
    return (
      <Box
        mt={6}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="md"
        overflow="hidden"
      >
        {config.type === "POINT" ? (
          <>
            <Flex
              bg="blue.50"
              px={4}
              py={2}
              fontWeight="semibold"
              align="center"
              color="blue.700"
            >
              {" "}
              <Text flex={1}>{section.sectionTitle}</Text>
              {config.roleList?.map((role) => (
                <Text w="90px" textAlign="center">
                  {role}
                </Text>
              ))}
              <Text w="90px" textAlign="center">
                Final
              </Text>
            </Flex>
            {}{" "}
            {section.criteriaList?.map((c, idx) => (
              <Flex
                key={c.detailId}
                align="center"
                borderTop="1px solid"
                borderColor="gray.200"
                bg={idx % 2 === 0 ? "gray.50" : "white"}
                padding={"5px"}
              >
                <Text w="40px" textAlign="center">
                  {idx + 1}
                </Text>

                <Text flex={1} px={2}>
                  {c.criteriaContent}
                </Text>
                {config.roleList?.map((role) => (
                  <Input
                    key={`${c.detailId}-${role}`}
                    w="90px"
                    size="sm"
                    textAlign="center"
                    marginX={"5px"}
                    placeholder={role}
                    disabled={user.rev_role !== role}
                  />
                ))}
                <Input
                  w="90px"
                  size="sm"
                  textAlign="center"
                  fontWeight="bold"
                  readOnly={true}
                />
              </Flex>
            ))}
          </>
        ) : config.type === "TARGET" ? (
          <>
            <Box
              bg="blue.50"
              px={4}
              py={2}
              fontWeight="semibold"
              align="center"
              color="blue.700"
            >
              <Text>{section.sectionTitle}</Text>
            </Box>
            <Box>target list</Box>
          </>
        ) : (
          <>
            <Box
              bg="blue.50"
              px={4}
              py={2}
              fontWeight="semibold"
              align="center"
              color="blue.700"
            >
              <Text>{section.sectionTitle}</Text>
            </Box>
            {config.roleList?.map((role) => (
              <Textarea
                size="sm"
                placeholder="Enter comment..."
                border={"none"}
                outline={"none"}
                disabled={user.rev_role !== role}
              />
            ))}
          </>
        )}

        {/* Rows */}
      </Box>
    );
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
      {/* Personal Info */}
      <PersonalInfo employeeInfo={employeeInfo} />

      {/* Evaluation */}
      {formTemplate.sectionList?.map((section) => (
        <EvaluationSection key={section.detailId} section={section} />
      ))}
      <Flex>
        <Button
          mt={6}
          colorScheme="blue"
          //   isLoading={loading}
          loadingText="Submitting..."
          //   onClick={handleSubmit}
          bgColor={"blue.700"}
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default ReviewPage;

import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Tabs,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import AppCard from "../../components/AppCard";
import { FaArrowLeft } from "react-icons/fa";
import {
  SectionList,
  type SectionListHandle,
} from "../../components/form-builder/section/SectionList";
import type { Section } from "../../components/form-builder/section/SectionItem";
import {
  FormCreator,
  type FormCreatorHandler,
} from "../../components/form-builder/FormCreator";
import { useQuery } from "@tanstack/react-query";
import {
  ReviewConfigProvider,
  type ReviewConfig,
} from "../../context/ReviewConfigContext";
import { axiosInstant, type ApiResponse } from "../../lib/axios";
import { useCriteria } from "../../hooks/useCriteria";
import type { SectionCriteria } from "../../components/form-builder/form-section/FormSectionList";
import { CriteriaList } from "../../components/form-builder/criteria/CriteriaList";
import type { Criteria } from "../../types/criteria";

export type SelectionContextRef = {
  selectedSectionIdRef: React.RefObject<string | null>;
  // extra?: {
  //   validate?: () => boolean;
  //   reset?: () => void;
  // };
};

const FormBuilderPage = () => {
  const sectionListRef = useRef<SectionListHandle>(null);
  const formCreatorRef = useRef<FormCreatorHandler>(null);
  const selectionCtxRef = useRef<SelectionContextRef>({
    selectedSectionIdRef: useRef<string | null>(null),
  });
  const [activeTab, setActiveTab] = useState<"sections" | "criteria">(
    "sections"
  );
  const [criteriaSectionId, setCriteriaSectionId] = useState<string | null>(
    null
  );

  const { data: criteriaList } = useCriteria({
    sectionId: criteriaSectionId ?? undefined,
  });

  // const sectionCriteriaList = useMemo<SectionCriteria[]>(() => {
  //   // console.log("criteriaList: " + JSON.stringify(criteriaList, null, 2));
  //   return (criteriaList ?? []).map((c) => ({
  //     order: 0,
  //     sectionId: c.sectionId ?? "",
  //     criteriaId: c.formDetailId ?? "",
  //     criteriaTitle: c.criteriaContent ?? "",
  //   }));
  // }, [criteriaList]);

  const handleAddExistingCriteria = (criteria: Partial<Criteria>) => {
    formCreatorRef.current?.addCriteria({
      criteriaId: criteria.criteriaId,
      criteriaContent: criteria.criteriaContent,
      sectionId: criteria.sectionId,
    });
  };

  const handleAddExistingSection = (section: Section) => {
    formCreatorRef.current?.addSection({
      sectionId: section.sectionId,
      sectionTitle: section.sectionTitle,
      reviewConfigType: section.reviewConfigType,
      defaultReviewConfigCode: section.defaultReviewConfigCode,
    });
  };

  const handleOrderSections = () => {
    const metaData = formCreatorRef.current?.getData();
    if (!metaData) return;

    sectionListRef.current?.updateOrder({
      departmentCode: metaData.departmentCode,
      positionCode: metaData.positionCode,
      levelCode: metaData.levelCode,
    });
  };

  const { data: reviewConfigs = [] } = useQuery({
    queryKey: ["review-configs"],
    queryFn: async () => {
      const res = await axiosInstant.get<ApiResponse<ReviewConfig[]>>(
        "/review-config"
      );

      return res.data.data || [];
    },
  });

  // const [criteriaList, setCriteriaList] = useState<Criteria | null>(null);

  return (
    <ReviewConfigProvider value={reviewConfigs}>
      <AppCard>
        <Flex alignItems="center" justifyContent="space-between" gap="16px">
          <Flex alignItems="center" gap="16px">
            <IconButton
              variant="ghost"
              onClick={() => console.log("back click")}
            >
              <FaArrowLeft />
            </IconButton>
            <Heading>Form Builder</Heading>
          </Flex>

          <Flex gap="16px">
            <Button size="sm" variant="outline">
              Copy Template
            </Button>
            <Button
              size="sm"
              colorPalette="blue"
              onClick={() => formCreatorRef.current?.submit()}
            >
              Save Form
            </Button>
          </Flex>
        </Flex>

        <Grid
          templateColumns={{ base: "1fr", md: "8fr 4fr" }}
          gap="16px"
          position={"relative"}
        >
          <FormCreator
            ref={formCreatorRef}
            onChange={handleOrderSections}
            selectionCtxRef={selectionCtxRef}
            onSectionSelected={() => {
              const sectionId =
                selectionCtxRef.current?.selectedSectionIdRef.current;
              if (!sectionId) return;
              setCriteriaSectionId(sectionId);
              setActiveTab("criteria");
            }}
          />

          <Box position="sticky" top="72px" height="fit-content">
            <Tabs.Root
              defaultValue="sections"
              value={activeTab}
              onValueChange={(details) =>
                setActiveTab(details.value as "sections" | "criteria")
              }
            >
              <Tabs.List>
                <Tabs.Trigger value="sections">Section</Tabs.Trigger>
                <Tabs.Trigger value="criteria">Criteria</Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="criteria">
                <Flex flexDirection="column" gap="16px">
                  <Flex flexDirection="column" gap="16px">
                    <CriteriaList
                      criteriaList={criteriaList ?? []}
                      onAddToForm={handleAddExistingCriteria}
                    />
                  </Flex>
                </Flex>
              </Tabs.Content>

              <Tabs.Content value="sections">
                <Flex flexDirection="column" gap="16px">
                  <Flex flexDirection="column" gap="16px">
                    <SectionList
                      ref={sectionListRef}
                      onAddToForm={handleAddExistingSection}
                    />
                  </Flex>
                </Flex>
              </Tabs.Content>
            </Tabs.Root>
          </Box>
        </Grid>
      </AppCard>
    </ReviewConfigProvider>
  );
};

export default FormBuilderPage;

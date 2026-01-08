import {
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Tabs,
} from "@chakra-ui/react";
import { useRef } from "react";
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

const FormBuilderPage = () => {
  const sectionListRef = useRef<SectionListHandle>(null);
  const formCreatorRef = useRef<FormCreatorHandler>(null);

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

        <Grid templateColumns={{ base: "1fr", md: "8fr 4fr" }} gap="16px">
          <FormCreator ref={formCreatorRef} onChange={handleOrderSections} />

          <Tabs.Root defaultValue="sections">
            <Tabs.List>
              <Tabs.Trigger value="sections">Sections</Tabs.Trigger>
              <Tabs.Trigger value="criteria">Crteria</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="crtieria">
              <Flex flexDirection="column" gap="16px">
                <Flex flexDirection="column" gap="16px"></Flex>
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
        </Grid>
      </AppCard>
    </ReviewConfigProvider>
  );
};

export default FormBuilderPage;

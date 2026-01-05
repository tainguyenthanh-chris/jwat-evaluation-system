import {
  Button,
  Field,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  Tabs,
} from "@chakra-ui/react";
import { useRef } from "react";
import AppCard from "../../components/AppCard";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import {
  SectionList,
  type SectionListHandle,
} from "../../components/form-builder/section/SectionList";
import { FormStructureEditor } from "../../components/form-builder/FormStuctureEditor";
import type { FormSectionHandler } from "../../components/form-builder/form-section/FormSectionList";
import type { Section } from "../../components/form-builder/section/SectionItem";

const FormBuilderPage = () => {
  const sectionListRef = useRef<SectionListHandle>(null);
  const formEditorRef = useRef<FormSectionHandler>(null);

  const handleAddExistingSection = (section: Section) => {
    formEditorRef.current?.addSection({
      secId: section.secId,
      secTitle: section.secTitle,
      revConfType: section.revConfType,
      defaultRevConfCd: section.defaultRevConfCd,
    });
  };

  // const handleSaveForm = () => {
  //   const sections = formEditorRef.current?.getSections();
  //   console.log("Saving form with sections:", sections);
  //   // TODO: Call API to save form
  // };

  return (
    <AppCard>
      <Flex alignItems="center" justifyContent="space-between" gap="16px">
        <Flex alignItems="center" gap="16px">
          <IconButton variant="ghost" onClick={() => console.log("back click")}>
            <FaArrowLeft />
          </IconButton>
          <Heading>Form Builder</Heading>
        </Flex>

        <Flex gap="16px">
          <Button size="sm" variant="outline">
            Copy Template
          </Button>
          <Button size="sm" colorPalette="blue">
            Save Form
          </Button>
        </Flex>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "8fr 4fr" }} gap="32px">
        <Flex flexDirection="column" gap="32px">
          <Flex flexDirection="column" gap="16px">
            {/* <Flex flexDirection="column" gap="16px">
              <Flex flexDirection="column" gap="16px">
                <Field.Root>
                  <Field.Label>Title</Field.Label>
                  <Input placeholder="Form title..." />
                </Field.Root>
              </Flex>
            </Flex> */}

            {/* <Flex flexDirection="column" gap="16px">
              <Text fontSize="lg" fontWeight="semibold">
                Structure:
              </Text>
            </Flex> */}

            <FormStructureEditor ref={formEditorRef} />
          </Flex>
        </Flex>

        <Tabs.Root defaultValue="sections">
          <Tabs.List>
            <Tabs.Trigger value="sections">Sections</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="sections">
            <Flex flexDirection="column" gap="16px">
              <Field.Root>
                <Field.Label>Search section:</Field.Label>
                <Input
                  size="sm"
                  placeholder="Search sections..."
                  onChange={(e) =>
                    sectionListRef.current?.setSearch(e.target.value)
                  }
                />
              </Field.Root>

              <Button
                size="sm"
                colorPalette="blue"
                onClick={() => sectionListRef.current?.openCreateDialog()}
              >
                <FaPlus /> Create
              </Button>

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
  );
};

export default FormBuilderPage;

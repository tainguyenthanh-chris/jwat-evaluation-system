import {
  Button,
  Card,
  Field,
  Flex,
  Input,
  Portal,
  Select,
  Text,
  type ListCollection,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export type AddSectionToFormProps = {
  configCollection: ListCollection;
  onSubmit: (sectionName: string, configCode: string) => void;
};

export const AddSectionToForm = ({
  configCollection,
  onSubmit,
}: AddSectionToFormProps) => {
  const [sectionName, setSectionName] = useState("");
  const [configCode, setConfigCode] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!sectionName.trim() || !configCode) return;
    onSubmit(sectionName, configCode);
    setSectionName("");
    setConfigCode(null);
  };

  return (
    <Card.Root>
      <Card.Body padding="16px">
        <Flex flexDirection="column" gap="16px">
          <Text fontSize="md" fontWeight="semibold">
            Add New Section
          </Text>

          <Flex gap="16px">
            <Field.Root flex="1">
              <Field.Label>Section Name</Field.Label>
              <Input
                size="sm"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
              />
            </Field.Root>

            <Field.Root flex="1">
              <Field.Label>Config Type</Field.Label>
              <Select.Root
                collection={configCollection}
                size="sm"
                value={configCode ? [configCode] : []}
                onValueChange={(e) => setConfigCode(e.value[0] ?? null)}
              >
                <Select.HiddenSelect />
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select config type" />
                  </Select.Trigger>
                </Select.Control>
                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      {configCollection.items.map((c) => (
                        <Select.Item item={c} key={c.value}>
                          {c.label}
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Field.Root>
          </Flex>

          <Button
            size="sm"
            colorPalette="blue"
            onClick={handleSubmit}
            disabled={!sectionName.trim() || !configCode}
          >
            <FaPlus /> Add Section
          </Button>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
};

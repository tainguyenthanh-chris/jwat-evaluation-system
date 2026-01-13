import {
  Box,
  Button,
  createListCollection,
  Heading,
  HStack,
  Input,
  InputGroup,
  Portal,
  Select,
  Table,
  Text,
} from "@chakra-ui/react";

import { useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import type { AdminEmployeeQuery } from "../../api/adminEmployeeApi";
import { useAdminEmployee } from "../../hooks/useAdminEmployee";
import { Tooltip } from "../../components/ui/tooltip";
import type { Employee } from "../../types/employee";
import BaseDialog from "../../components/dialog/BaseDialog";
import ChangeReviewerForm from "./components/ChangeReviewForm";

const actionList = createListCollection({
  items: [{ label: "Change reviewer", value: "change-reviewer" }],
});

const AdminEmployeePage = () => {
  // const adminEmployeeQuery: AdminEmployeeQuery = {
  //   // employeeNo: employeeInfo.employeeNo,
  // };
  const buildAdminEmployeeQuery = (value: string): AdminEmployeeQuery => {
    if (!value) return {};
    const v = value.trim();
    if (!v) return {};
    if (/^\d+$/.test(v)) {
      return { employeeNo: v };
    }
    return { employeeName: v };
  };
  const [searchInput, setSearchInput] = useState<string>("");
  const adminEmployeeQuery = useMemo(
    () => buildAdminEmployeeQuery(searchInput),
    [searchInput]
  );
  const { data } = useAdminEmployee(adminEmployeeQuery);

  const filteredData = data;

  type DialogType = "CHANGE_REVIEWER" | "CHANGE_FORM" | "CONFIRM_DELETE" | null;
  const [activeDialog, setActiveDialog] = useState<DialogType>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const openDialog = (type: DialogType, emp?: Employee) => {
    setSelectedEmployee(emp ?? null);
    setActiveDialog(type);
  };

  const closeDialog = () => {
    setActiveDialog(null);
    setSelectedEmployee(null);
  };
  const handleActionChange = (emp: Employee, action?: string) => {
    if (!action) return;
    switch (action) {
      case "change-reviewer":
        console.log("Change reviewer for:", emp.employeeNo);
        openDialog("CHANGE_REVIEWER", emp);
        break;

      default:
        console.warn("Unknown action:", action);
    }
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
      <Heading>Admin employee</Heading>
      <Box ml={"auto"} w={"40%"}>
        <InputGroup startElement={<LuSearch />}>
          <Input
            placeholder="Search by name or number"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </InputGroup>
      </Box>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader width="5%">Idx</Table.ColumnHeader>
            <Table.ColumnHeader width="25%">Name</Table.ColumnHeader>
            <Table.ColumnHeader width="20%">Email</Table.ColumnHeader>
            <Table.ColumnHeader width="10%">No</Table.ColumnHeader>
            <Table.ColumnHeader width="15%">Info</Table.ColumnHeader>
            <Table.ColumnHeader width="15%">ReviewBy</Table.ColumnHeader>
            <Table.ColumnHeader width="10%">Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredData?.map((item, index) => (
            <Table.Row
              key={item.employeeId}
              _odd={{ bg: "gray.100" }}
              _even={{ bg: "white" }}
              _hover={{ bg: "blue.100" }}
              cursor={"pointer"}
            >
              <Table.Cell width="5%">{index + 1}</Table.Cell>
              <Table.Cell width="25%">{item.employeeName}</Table.Cell>
              <Table.Cell width="20%">
                <Text title={item.employeeEmail}>{item.employeeEmail}</Text>
              </Table.Cell>
              <Table.Cell width="10%">{item.employeeNo}</Table.Cell>
              <Table.Cell width="15%">{item.employeeInfo}</Table.Cell>
              <Table.Cell width="15%">
                {item.reviewBy && item.reviewBy.length > 0 ? (
                  <HStack wrap="wrap">
                    {item.reviewBy.map((rv, idx) => (
                      <Tooltip key={idx} content={rv.bossNo}>
                        <Text
                          cursor="pointer"
                          color="blue.600"
                          _hover={{ textDecoration: "underline" }}
                          fontSize="sm"
                        >
                          {rv.bossName}
                        </Text>
                      </Tooltip>
                    ))}
                  </HStack>
                ) : (
                  <Text color="gray.400" fontSize="sm">
                    -
                  </Text>
                )}
              </Table.Cell>
              <Table.Cell width="10%">
                {" "}
                <Select.Root
                  collection={actionList}
                  size="sm"
                  width="200px"
                  onValueChange={(e) => {
                    const action = e.value[0];
                    if (!action) return;
                    handleActionChange(item, action);
                  }}
                >
                  <Select.HiddenSelect />
                  <Select.Label>Action</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select framework" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {actionList.items.map((item) => (
                          <Select.Item item={item} key={item.value}>
                            {item.label}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <BaseDialog
        open={activeDialog === "CHANGE_REVIEWER"}
        onClose={closeDialog}
        maxW="60%"
        // title="Change Reviewer"
      >
        <ChangeReviewerForm employee={selectedEmployee ?? undefined} />
      </BaseDialog>
    </Box>
  );
};

export default AdminEmployeePage;

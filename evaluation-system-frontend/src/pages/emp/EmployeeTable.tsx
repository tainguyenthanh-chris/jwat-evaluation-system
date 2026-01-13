import {
  Table,
  Button,
  HStack,
  Dialog,
  Portal,
  Stack,
  Text,
  Spinner,
  RadioGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { BossRevRoleEnum, type EmployeeBackend } from "../../types/emp";
import type { Form } from "../../types/formTemplate";
import { axiosInstant } from "../../lib/axios";
import { useNavigate } from "react-router-dom";

type Props = {
  employees: EmployeeBackend[];
  onRefresh: () => void;
};

type ReviewerRole = keyof typeof BossRevRoleEnum;

type SelectedReviewer = {
  emp: EmployeeBackend;
  role: ReviewerRole;
};
const ROLE_ORDER_MAP: Record<ReviewerRole, number> = {
  LEADER: 1,
  GM: 2,
  DIRECTOR: 3,
};

export default function EmployeeTable({ employees, onRefresh }: Props) {
  const [forms, setForms] = useState<Form[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState<EmployeeBackend | null>(null);
  const [selectedFormId, setSelectedFormId] = useState<string | null>(null);

  const [reviewerOpen, setReviewerOpen] = useState(false);
  const [allEmployees, setAllEmployees] = useState<EmployeeBackend[]>([]);
  const [selectedReviewers, setSelectedReviewers] = useState<
    SelectedReviewer[]
  >([]);
  const [loadingReviewer, setLoadingReviewer] = useState(false);

  const getAllForm = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstant.get("/form/all");
      setForms(res.data.data);
    } catch {
      setError("Failed to load forms");
    } finally {
      setIsLoading(false);
    }
  };

  const updateForm = async () => {
    if (!selectedEmp || !selectedFormId) return;

    try {
      await axiosInstant.put("/form-subm/change-form", {
        empId: selectedEmp.empId,
        formId: selectedFormId,
      });

      await onRefresh();
      setOpen(false);
    } catch {
      alert("Failed to update form");
    }
  };

  useEffect(() => {
    getAllForm();
  }, []);

  const openChangeFormDialog = (emp: EmployeeBackend) => {
    setSelectedEmp(emp);
    setSelectedFormId(emp.formSubm?.form?.formId ?? null);
    setOpen(true);
  };
  const navigate = useNavigate();

  const onRowClick = (emp: EmployeeBackend) => {
    const employeeNoList = sortedEmployees.map((emp) => emp.empNo);
    navigate(`/history/employee/${emp.empNo}`, {
      state: {
        employeeName: emp.empNm,
        employeeNoList: employeeNoList,
      },
    });
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    const aPending = a.formSubm?.formSubmStatus === "PENDING";
    const bPending = b.formSubm?.formSubmStatus === "PENDING";
    if (aPending === bPending) return 0;
    return aPending ? -1 : 1;
  });

  const openChangeReviewerDialog = async (emp: EmployeeBackend) => {
    setSelectedEmp(emp);
    setReviewerOpen(true);
    setLoadingReviewer(true);

    const existing =
      emp.formSubm?.bossRevList?.map((b) => ({
        emp: b.bossEmp!,
        role: b.bossRevRole as ReviewerRole,
      })) ?? [];

    setSelectedReviewers(existing);

    try {
      const res = await axiosInstant.get("/emp");
      setAllEmployees(res.data.data);
    } catch {
      alert("Failed to load employees");
    } finally {
      setLoadingReviewer(false);
    }
  };

  const upsertReviewer = (emp: EmployeeBackend, role: ReviewerRole) => {
    setSelectedReviewers((prev) => {
      const withoutSameRole = prev.filter((r) => r.role !== role);

      const exists = withoutSameRole.find((r) => r.emp.empId === emp.empId);

      if (exists) {
        return withoutSameRole.map((r) =>
          r.emp.empId === emp.empId ? { ...r, role } : r
        );
      }

      return [...withoutSameRole, { emp, role }];
    });
  };

  const removeReviewer = (empId: string) => {
    setSelectedReviewers((prev) => prev.filter((r) => r.emp.empId !== empId));
  };

  const submitReviewerChange = async () => {
    if (!selectedEmp) return;

    const bossRevs = selectedReviewers.map((r) => ({
      bossRevRole: r.role,
      orderNo: ROLE_ORDER_MAP[r.role],
      bossEmpNo: r.emp.empNo,
    }));

    try {
      await axiosInstant.put("/bossRev/update-batch", {
        empNo: selectedEmp.empNo,
        formSubmId: selectedEmp.formSubm?.formSubmId,
        bossRevs,
      });

      await onRefresh();
      setReviewerOpen(false);
    } catch {
      alert("Failed to update reviewers");
    }
  };

  return (
    <>
      <Table.Root size="sm" variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>No</Table.ColumnHeader>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Department</Table.ColumnHeader>
            <Table.ColumnHeader>Position</Table.ColumnHeader>
            <Table.ColumnHeader>Level</Table.ColumnHeader>
            <Table.ColumnHeader>Status</Table.ColumnHeader>
            <Table.ColumnHeader>Reviewers</Table.ColumnHeader>
            <Table.ColumnHeader>Evaluation Form</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="center">Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedEmployees.map((emp) => (
            <Table.Row
              // onClick
              key={emp.empId}
              cursor="pointer"
              bg={
                emp.formSubm?.formSubmStatus === "PENDING"
                  ? "orange.100"
                  : "transparent"
              }
              color={
                emp.formSubm?.formSubmStatus === "PENDING" ? "black" : "inherit"
              }
              _hover={{
                bg:
                  emp.formSubm?.formSubmStatus === "PENDING"
                    ? "orange.200"
                    : "gray.200",
                color:
                  emp.formSubm?.formSubmStatus === "PENDING"
                    ? "black"
                    : "black",
              }}
              onClick={() => onRowClick(emp)}
            >
              <Table.Cell>{emp.empNo}</Table.Cell>
              <Table.Cell fontWeight="medium">{emp.empNm}</Table.Cell>
              <Table.Cell>{emp.empEmail}</Table.Cell>
              <Table.Cell>{emp.deptCd}</Table.Cell>
              <Table.Cell>{emp.posCd}</Table.Cell>
              <Table.Cell>{emp.lvlCd}</Table.Cell>

              <Table.Cell>
                {emp.empStatusCd === "ACTIVE" ? "Active" : "Inactive"}
              </Table.Cell>

              <Table.Cell>
                {emp.formSubm?.bossRevList?.length
                  ? emp.formSubm.bossRevList
                      .map((b) => b.bossEmp?.empNm)
                      .filter(Boolean)
                      .join(", ")
                  : "-"}
              </Table.Cell>

              <Table.Cell>
                {emp.formSubm?.formSubmStatus === "PENDING"
                  ? emp.formSubm?.form?.formTitle
                  : "-"}
              </Table.Cell>

              <Table.Cell textAlign="center">
                {emp.formSubm?.formSubmStatus === "PENDING" && (
                  <HStack justify="center">
                    <Button
                      size="xs"
                      colorPalette="blue"
                      onClick={(e) => {
                        e.stopPropagation();
                        openChangeFormDialog(emp);
                      }}
                    >
                      Change Form
                    </Button>
                    <Button
                      size="xs"
                      colorPalette="green"
                      onClick={(e) => {
                        e.stopPropagation();
                        openChangeReviewerDialog(emp);
                      }}
                    >
                      Change Reviewer
                    </Button>
                  </HStack>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="lg">
              <Dialog.Header>
                <Dialog.Title>Change Evaluation Form</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                {isLoading ? (
                  <Spinner />
                ) : error ? (
                  <Text color="red.500">{error}</Text>
                ) : (
                  <RadioGroup.Root
                    value={selectedFormId}
                    onValueChange={(e) => setSelectedFormId(e.value)}
                  >
                    <Stack gap="3">
                      {forms.map((form) => (
                        <RadioGroup.Item
                          key={form.formId}
                          value={form.formId}
                          p="3"
                          borderWidth="1px"
                          borderRadius="md"
                          _checked={{
                            bg: "blue.50",
                            borderColor: "blue.400",
                            color: "blue.800",
                            boxShadow: "md",
                          }}
                        >
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText>
                            <Text fontWeight="medium">{form.formTitle}</Text>
                            <Text fontSize="sm" color="gray.500">
                              {form.deptCd} · {form.posCd} · {form.lvlCd}
                            </Text>
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                      ))}
                    </Stack>
                  </RadioGroup.Root>
                )}
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>

                <Button
                  colorPalette="blue"
                  onClick={updateForm}
                  disabled={!selectedFormId}
                >
                  Submit
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Dialog.Root
        open={reviewerOpen}
        onOpenChange={(e) => setReviewerOpen(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content maxW="xl">
              <Dialog.Header>
                <Dialog.Title>Change Reviewers</Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                {loadingReviewer ? (
                  <Spinner />
                ) : (
                  <Stack gap="4">
                    <Stack
                      gap="3"
                      maxH="300px"
                      overflowY="auto"
                      borderWidth="1px"
                      borderRadius="md"
                      p="2"
                    >
                      <Text fontWeight="bold">All Employees</Text>

                      {allEmployees.map((emp) => {
                        const selected = selectedReviewers.find(
                          (r) => r.emp.empId === emp.empId
                        );

                        return (
                          <HStack
                            key={emp.empId}
                            p="2"
                            borderWidth="1px"
                            borderRadius="md"
                            justify="space-between"
                          >
                            <Text>{emp.empNm}</Text>

                            <RadioGroup.Root
                              value={selected?.role ?? ""}
                              onValueChange={(e) =>
                                upsertReviewer(emp, e.value as ReviewerRole)
                              }
                            >
                              <HStack>
                                {Object.keys(BossRevRoleEnum).map((role) => (
                                  <RadioGroup.Item
                                    key={role}
                                    value={role}
                                    disabled={selectedReviewers.some(
                                      (r) =>
                                        r.role === role &&
                                        r.emp.empId !== emp.empId
                                    )}
                                  >
                                    <RadioGroup.ItemHiddenInput />
                                    <RadioGroup.ItemIndicator />
                                    <RadioGroup.ItemText>
                                      {role}
                                    </RadioGroup.ItemText>
                                  </RadioGroup.Item>
                                ))}
                              </HStack>
                            </RadioGroup.Root>
                          </HStack>
                        );
                      })}
                    </Stack>

                    <Stack
                      gap="2"
                      borderWidth="1px"
                      borderRadius="md"
                      p="3"
                      bg="gray.200"
                      color="black"
                      maxH="180px"
                      overflowY="auto"
                    >
                      <Text fontWeight="bold">Selected Reviewers</Text>

                      {selectedReviewers.length === 0 ? (
                        <Text fontSize="sm" color="gray.500">
                          No reviewers selected
                        </Text>
                      ) : (
                        selectedReviewers
                          .sort(
                            (a, b) =>
                              ROLE_ORDER_MAP[a.role] - ROLE_ORDER_MAP[b.role]
                          )
                          .map((r) => (
                            <HStack key={r.emp.empId} justify="space-between">
                              <Text>
                                <b>{r.role}</b> - {r.emp.empNm}
                              </Text>

                              <Button
                                size="xs"
                                variant="ghost"
                                colorPalette="red"
                                onClick={() => removeReviewer(r.emp.empId)}
                              >
                                Remove
                              </Button>
                            </HStack>
                          ))
                      )}
                    </Stack>
                  </Stack>
                )}
              </Dialog.Body>

              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </Dialog.ActionTrigger>

                <Button
                  colorPalette="green"
                  onClick={submitReviewerChange}
                  disabled={selectedReviewers.length === 0}
                >
                  Submit
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
}

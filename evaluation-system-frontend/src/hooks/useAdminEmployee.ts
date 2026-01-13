import { useMutation, useQuery } from "@tanstack/react-query";
import { getEmployee, getEmployeeNameByNo, type AdminEmployeeQuery } from "../api/adminEmployeeApi";


export const useAdminEmployee = (query: AdminEmployeeQuery) => {
  return useQuery({
    queryKey: ["admin-employee", query],
    queryFn: () => getEmployee(query),
  });
};

export const useAdminEmployeeNameByEmployeeNo = (query: AdminEmployeeQuery) => {
  return useQuery({
    queryKey: ["admin-employee-name", query],
    queryFn: () => getEmployeeNameByNo(query),
    enabled: !!query.employeeNo && query.employeeNo.length >= 6,
  });
};

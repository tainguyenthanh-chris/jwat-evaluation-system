import { axiosInstant } from "../lib/axios";
import type { ApiResponse } from "../lib/axios";
import type { Employee } from "../types/employee";

export interface AdminEmployeeQuery {
  employeeNo?: string;
  formSubmissionId?: string;
  employeeName?: string;
}

export const getEmployee = async (
  query: AdminEmployeeQuery
): Promise<Employee[]> => {
  const { data } = await axiosInstant.get<ApiResponse<Employee[]>>(
    "admin/employee",
    { params: query }
  );
  return data.data;
};

export const getEmployeeNameByNo = async (
  query: AdminEmployeeQuery
): Promise<Employee> => {
  const { data } = await axiosInstant.get<ApiResponse<Employee>>(
    "admin/employee/employeeNo",
    { params: query }
  );
  return data.data;
};



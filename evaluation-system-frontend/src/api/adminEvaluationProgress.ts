import { axiosInstant } from "../lib/axios";
import type { ApiResponse } from "../lib/axios";
import type { EmployeeProgress } from "../pages/evaluationProgress/EvaluationProgressPage";
import type { Employee } from "../types/employee";

export interface AdminReviewingEmployeeQuery {
  bossNo?: string;
}


export const getReviewingEmployee = async (
  query: AdminReviewingEmployeeQuery
): Promise<EmployeeProgress[]> => {
  const { data } = await axiosInstant.get<ApiResponse<EmployeeProgress[]>>(
    "admin/employee/reviewingEmployee",
    { params: query }
  );
  return data.data;
};






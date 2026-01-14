import { axiosInstant } from "../lib/axios";
import type { ApiResponse } from "../lib/axios";
import type { SummaryTable } from "../types/summaryTable";

export interface SummaryTableQuery {
  employeeNo?: string;
  formSubmissionId?: string;
}

export const getSummaryTable = async (
  query: SummaryTableQuery
): Promise<SummaryTable[]> => {
  const { data } = await axiosInstant.get<ApiResponse<SummaryTable[]>>(
    "summary-submission",
    { params: query }
  );
  return data.data;
};



import type { EvaluationQuery } from "../hooks/useEvaluation";
import { axiosInstant, type ApiResponse } from "../lib/axios";
import type { EvaluationData } from "../types/evaluationData";

export const fetchEvaluationData = async (
  query: EvaluationQuery
): Promise<EvaluationData> => {
  const { data } = await axiosInstant.get<ApiResponse<EvaluationData>>(
    "/form/submission/employeeNo",
    { params: query }
  );
  return data.data;
};

export const fetchEvaluationData = async (
  query: EvaluationQuery
): Promise<EvaluationData> => {
  const { data } = await axiosInstant.get<ApiResponse<EvaluationData>>(
    "/form/submission/employeeNo",
    { params: query }
  );
  return data.data;
};




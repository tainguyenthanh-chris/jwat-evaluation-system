import type { EvaluationQuery } from "../hooks/useEvaluation";
import { axiosInstant } from "../lib/axios";
import type { ApiResponse } from "../lib/axios";
import type { SubmitEvaluationPayload } from "../pages/reviewPage/ReviewPage";
import type { EvaluationData } from "../types/evaluationData";

export const fetchEvaluationData = async (
  query: EvaluationQuery
): Promise<EvaluationData> => {
  const { data } = await axiosInstant.get<ApiResponse<EvaluationData>>(
    "/form/submission",
    { params: query }
  );
  return data.data;
};

export const postEvaluation = async (
  payload: SubmitEvaluationPayload
): Promise<void> => {
  await axiosInstant.post<ApiResponse<void>>(
    "/form-subm",
    payload
  );
};

export const fetchProgressingEvaluation = async (
  query: EvaluationQuery
): Promise<EvaluationData> => {
  const { data } = await axiosInstant.get<ApiResponse<EvaluationData>>(
    "/emp/progressing-evaluation",
    { params: query }
  );
  return data.data;
};

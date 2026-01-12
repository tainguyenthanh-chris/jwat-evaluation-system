import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvaluationData, postEvaluation } from "../api/evaluationApi";

export interface EvaluationQuery {
  employeeNo?: string;
  formSubmissionId?: string;
  mode?: "REVIEW" | "HISTORY";

}

export const useEvaluation = (query: EvaluationQuery) => {
  return useQuery({
    queryKey: ["evaluation-data", query],
    queryFn: () => fetchEvaluationData(query),
    enabled:
      !!query.employeeNo
  });
};

export const useSubmitEvaluation = () => {
  return useMutation({
    mutationFn: postEvaluation,
  });
};

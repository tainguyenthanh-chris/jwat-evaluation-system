import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvaluationData, postEvaluation } from "../api/evaluationApi";

export interface EvaluationQuery {
  employeeNo?: string;
  formSubmissionId?: string;
  mode?: "REVIEW" | "HISTORY";

}

export const useEvaluation = (query: EvaluationQuery) => {
  const enabled = Boolean(
    query.formSubmissionId || query.employeeNo
  );
  const queryKey = [
    "evaluation-data",
    query.formSubmissionId ?? null,
    query.employeeNo ?? null,
  ];

  return useQuery({
    queryKey,
    queryFn: () => fetchEvaluationData(query),
    enabled,
  });
};

export const useSubmitEvaluation = () => {
  return useMutation({
    mutationFn: postEvaluation,
    onSuccess: (data) => {
      return true;
    },
    onError: (error) => {
      console.error("SUBMIT ERROR:", error);
    },
  });
  
};

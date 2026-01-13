import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvaluationData, postEvaluation } from "../api/evaluationApi";
import { getSummaryTable, type SummaryTableQuery } from "../api/summaryTableApi";


export const useSummaryTable = (query: SummaryTableQuery) => {
  return useQuery({
    queryKey: ["summary-table", query],
    queryFn: () => getSummaryTable(query),
    enabled:
      !!query.employeeNo
  });
};

;

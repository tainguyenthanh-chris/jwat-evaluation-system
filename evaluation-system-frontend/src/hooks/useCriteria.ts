import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCriteriaData } from "../api/criteriaApi";

export interface CriteriaQuery {
  sectionId?: string;

}

export const useCriteria = (query: CriteriaQuery) => {
  return useQuery({
    queryKey: ["criteria-data", query],
    queryFn: () => fetchCriteriaData(query),
    enabled:
      !!query.sectionId
  });
};



import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCriteriaData } from "../api/criteriaApi";
import { fetchSectionData } from "../api/sectionApi";

export interface SectionQuery {
  sectionId?: string;

}

export const useSection = (query: SectionQuery) => {
  return useQuery({
       queryKey: ["section-data"],
       queryFn: () => fetchSectionData(query),
     });
};



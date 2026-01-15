import type { Section } from "../components/form-builder/section/SectionItem";
import type { CriteriaQuery } from "../hooks/useCriteria";
import type { SectionQuery } from "../hooks/useSection";
import { axiosInstant } from "../lib/axios";
import type { ApiResponse } from "../lib/axios";
import type { Criteria } from "../types/criteria";

export const fetchSectionData = async (
  query: SectionQuery
): Promise<Section[]> => {
  const { data } = await axiosInstant.get<ApiResponse<Section[]>>(
    "/section",
    { params: query }
  );
  return data.data;
};


import type { CriteriaQuery } from "../hooks/useCriteria";
import { axiosInstant } from "../lib/axios";
import type { ApiResponse } from "../lib/axios";
import type { Criteria } from "../types/criteria";

export const fetchCriteriaData = async (
  query: CriteriaQuery
): Promise<Partial<Criteria>[]> => {
  const { data } = await axiosInstant.get<ApiResponse<Partial<Criteria>[]>>(
    "/criteria",
    { params: query }
  );
  return data.data;
};


import { axiosInstant } from "../lib/axios";
import type { ApiResponse } from "../lib/axios";
import type { BossReview } from "../types/bossReview";

export interface BossReviewQuery {
  employeeNo?: string;
  formSubmissionId?: string;
}

export const getBossReview = async (
  query: BossReviewQuery
): Promise<BossReview[]> => {
  const { data } = await axiosInstant.get<ApiResponse<BossReview[]>>(
    "bossRev",
    { params: query }
  );
  return data.data;
};



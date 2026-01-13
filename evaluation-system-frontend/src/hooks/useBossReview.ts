import { useMutation, useQuery } from "@tanstack/react-query";
import { getBossReview, type BossReviewQuery } from "../api/bossReviewApi";


export const useBossReview = (query: BossReviewQuery) => {
  return useQuery({
    queryKey: ["boss-review", query],
    queryFn: () => getBossReview(query),
  });
};

;

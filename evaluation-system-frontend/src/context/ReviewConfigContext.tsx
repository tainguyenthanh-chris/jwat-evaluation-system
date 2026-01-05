import { createContext, useContext } from "react";

export type ReviewConfig = {
  revConfCd: string;
  revConfId: string;
  revConfRoles: string[];
  revConfType: string;
};

const ReviewConfigContext = createContext<ReviewConfig[]>([]);

export const ReviewConfigProvider = ReviewConfigContext.Provider;

export const useReviewConfigs = () => useContext(ReviewConfigContext);

export const useReviewConfigByCode = (revConfCd: string) => {
  const configs = useContext(ReviewConfigContext);
  return configs.find((c) => c.revConfCd === revConfCd);
};

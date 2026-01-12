import { createContext, useContext } from "react";

export type ReviewConfig = {
  reviewConfigCode: string;
  reviewConfigId: string;
  reviewConfigRoles: string[];
  reviewConfigType: string;
};

const ReviewConfigContext = createContext<ReviewConfig[]>([]);

export const ReviewConfigProvider = ReviewConfigContext.Provider;

export const useReviewConfigs = () => useContext(ReviewConfigContext);

export const useReviewConfigByCode = (reviewConfigCode: string) => {
  const configs = useContext(ReviewConfigContext);
  return configs.find((config) => config.reviewConfigCode === reviewConfigCode);
};

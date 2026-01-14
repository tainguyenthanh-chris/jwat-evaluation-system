import type { BossReview } from "./bossReview";

export interface SubmissionInfo {
  formSubmissionId: string;
  employeeName: string;
  employeeNo: string;
  position: string;
  level: string;
  reviewDate: string;
  department: string;
  reviewers: Partial<BossReview>[];
  nextReviewDate: string;
  submissionStatus: string
}

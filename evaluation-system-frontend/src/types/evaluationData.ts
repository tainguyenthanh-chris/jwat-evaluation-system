import type { BossReview } from "./bossReview";
import type { FormTemplate } from "./formTemplate";
import type { SubmissionValue } from "./submissionValue";
import type { SubmissionValueMap } from "./submissionValueMap";
import type { Target } from "./target";

export interface EvaluationData {
    formSubmissionId?: string;
  formId?: string;

  employeeName?: string;
  employeeNo?: string;
  employeeCurrentDepartmentCode?: string;
  employeeCurrentPositionCode?: string;
  employeeCurrentLevelCode?: string;

  reviewDate?: string;       // LocalDate → ISO string (yyyy-MM-dd)
  nextReviewDate?: string;   // LocalDate → ISO string

  submissionStatus?: "PENDING" | "APPROVED" | "REJECTED";
  formTemplate?: FormTemplate;
  /**
   * key = formDetailId
   * value = list of submission values
   */
  // submissionValueMap?: Record<string, SubmissionValue[]>;
  submissionValueMap?: SubmissionValueMap;
  reviewBy?: BossReview[];
  newTargetList?: Target[];
  currentTargetList?: Target[];
}


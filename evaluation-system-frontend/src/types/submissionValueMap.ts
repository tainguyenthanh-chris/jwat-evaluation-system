import type { SubmissionValue } from "./submissionValue";

export type SubmissionValueMap = Record<
  string, // formDetailId_submssionRole
  Partial<SubmissionValue>
>;

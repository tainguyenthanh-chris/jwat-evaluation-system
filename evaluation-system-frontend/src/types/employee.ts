import type { BossReview } from "./bossReview";

export interface Employee {
  employeeNo: string;
  employeeName: string;
  employeeEmail: string;
  employeeId: string;
  employeeInfo: string;
  reviewBy: Partial<BossReview>[];
}

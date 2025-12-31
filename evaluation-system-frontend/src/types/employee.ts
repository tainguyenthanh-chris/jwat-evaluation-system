export interface Employee {
  employeeName: string;
  employeeCode: string;
  position: string;
  reviewDate: string;
  department: string;
  reviewers: Partial<Employee>[];
  nextReviewDate: string;
}

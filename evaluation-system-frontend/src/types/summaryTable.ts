export interface SummaryTable {
  formSubmissionId: string;
  reviewDate: string;
  summaryData: SummaryItem[];
}

export interface SummaryItem {
  sectionTitle: string;
  summaryPoint: string;
}

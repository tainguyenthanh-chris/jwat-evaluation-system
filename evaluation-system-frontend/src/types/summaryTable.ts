export interface SummaryTable {
  formSubmissionId: string;
  reviewDate: string;
  summaryData: SummaryItem[];
  formSubmissionStatus: string;
}

export interface SummaryItem {
  sectionTitle: string;
  summaryPoint: string;
}

import type { Criteria } from "./criteria";
import type { Target } from "./target";

export interface Section {
  formDetailId: string;
  sectionTitle: string;
  config?: {
    type?: string;
    roleList?: string[];
  };
  criteriaList?: Criteria[];
  targetList?: Target[];
}

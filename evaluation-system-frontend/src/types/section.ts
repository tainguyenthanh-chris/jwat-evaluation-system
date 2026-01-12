import type { Criteria } from "./criteria";
import type { Target } from "./target";

export interface Section {
  formDetailId: string;
  sectionTitle: string;
  config?: {
    configType?: string;
    configRoleList?: string[];
  };
  criteriaList?: Criteria[];
  targetList?: Target[];
  configCode?: string;

}

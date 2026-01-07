import type { Section } from "./section";

export interface FormTemplate {
  id?: string;
  departmentCode?: string;
  positionCode?: string;
  levelCode?: string;
  sectionList?: Section[];
};


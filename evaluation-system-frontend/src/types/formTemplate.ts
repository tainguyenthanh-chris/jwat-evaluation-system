import type { Section } from "./section";

export interface FormTemplate {
  id?: string;
  departmentCode?: string;
  positionCode?: string;
  levelCode?: string;
  sectionList?: Section[];
};


export interface Form {
  formId: string;
  formTitle: string;
  formVer: number;
  deptCd: string;
  posCd: string;
  lvlCd: string;
  formStatus: "NEW" | "ACTIVE" | "OLD";
  creUsrId: string;
  creDt: string; 
  updUsrId: string;
  updDt: string;
  delFlg: "T" | "F";
}


export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
  timestamp: number;
}



export interface EmployeeBackend {
  empId: string;
  empNm: string;
  empNo: string;
  empEmail: string;

  compRoleCd: string;
  deptCd: string;
  posCd: string;
  lvlCd: string;

  salaryLvl: number;
  teamId: string | null;
  empStatusCd: string;

  formSubm?: FormSubmBackend | null;
}
export interface FormSubmBackend {
  formSubmId: string;
  formId: string;
  empId: string;
  empNm: string;
  empNo: string;

  empCurrDeptCd: string;
  empCurrPosCd: string;
  empCurrLvlCd: string;

  revDt: string;      
  nextRevDt: string;  
  formSubmStatus: string;

  form?: FormBackend | null;
  bossRevList?: BossRevBackend[];
}
export interface FormBackend {
  formId: string;
  formTitle: string;
  formVer: number;
  deptCd: string;
  posCd: string;
  lvlCd: string;
  formStatus: string;
}
export interface BossRevBackend {
  bossRevId: number;
  formSubmId: string;
  empNo: string;

  bossNo: string;
  bossRevRole: string;
  bossRevOrdNo: number;
  isFinal: string;

  bossEmp?: BossEmployeeBackend | null;
}
export interface BossEmployeeBackend {
  empId: string;
  empNm: string;
  empNo: string;
  empEmail: string;

  compRoleCd: string;
  deptCd: string;
  posCd: string;
  lvlCd: string;

  salaryLvl: number;
  teamId: string | null;
  empStatusCd: string;
}

export const BossRevRoleEnum = {
  LEADER: "LEADER",
  GM: "GM",
  DIRECTOR: "DIRECTOR",
} as const;


export enum InstitutionType {
    TPQ = "TPQ/TPA",
    MDT = "Madrasah Diniyah Takmiliyah (MDT)",
    RTQ = "Rumah Tahfidz Al Qur'an (RTQ)",
    PAUDQU = "PAUDQU"
}

export interface InstitutionReport {
    id: number;
    institutionType: InstitutionType;
    institutionName: string;
    address: string;
    operatorName: string;
    supervisorName: string;
    phone: string;
    permitNumber: string;
    maleStudents: number;
    femaleStudents: number;
    reportMonth: string; // YYYY-MM format
}

export interface AppFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

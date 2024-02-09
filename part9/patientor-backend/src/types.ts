export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other'
}

export type NewPatientData = Omit<PatientData, 'id'>;

export type NonSensitivePatientData = Omit<PatientData, 'ssn'>;

export interface PatientData {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}
import { Entry, Gender, NewPatientData } from "./types";

export const toNewPatientData = (object: unknown): NewPatientData => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object) {
    const newPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries)
    };
    return newPatient;
  }
  throw new Error('Incorrect data: required fields are missing');
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Incorrect or missing snn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!isEntryArray(entries)) {
    throw new Error('Incorrect or missing entries');
  }
  return entries;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isEntryArray = (entries: unknown): entries is Entry[] => {
  if (!Array.isArray(entries)) {
    return false;
  }
  return entries.every((entry) => (entry as Entry).type === 'HealthCheck' || (entry as Entry).type === 'Hospital' || (entry as Entry).type === 'OccupationalHealthcare');
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(gender);
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

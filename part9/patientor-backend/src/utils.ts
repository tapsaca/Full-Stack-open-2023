import { Diagnosis, Discharge, Entry, Gender, HealthCheckRating, NewEntryData, NewPatientData, SickLeave } from "./types";

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

export const toNewEntryData = (object: unknown): NewEntryData => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object && 'date' in object && 'specialist' in object) {
    let baseEntry;
    if ('diagnosisCodes' in object) {
      baseEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object)
      };
    } else {
      baseEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist)
      };
    }
    if ('type' in object) {
      switch(object.type) {
        case 'HealthCheck':
          if ('healthCheckRating' in object) {
            const newEntry = {
              ...baseEntry,
              type: object.type,
              healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
            return newEntry;
          }
          break;
        case 'Hospital':
          if ('discharge' in object) {
            const newEntry = {
              ...baseEntry,
              type: object.type,
              discharge: parseDischarge(object.discharge)
            };
            return newEntry;
          }
          break;
        case 'OccupationalHealthcare':
          if ('employerName' in object) {
            let newEntry;
            if ('sickLeave' in object) {
              newEntry = {
                ...baseEntry,
                type: object.type,
                employerName: parseEmployerName(object.employerName),
                sickLeave: parseSickLeave(object.sickLeave)
              };
            } else {
              newEntry = {
                ...baseEntry,
                type: object.type,
                employerName: parseEmployerName(object.employerName)
              };
            }
            return newEntry;
          }
      }
    }
  }
  throw new Error('Incorrect data: required fields are missing');
};

const parseDescription = (description: unknown): string => {
  if (!isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis['code']>;
  }
  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating)) {
    throw new Error('Incorrect or missing health check rating');
  }
  return rating;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (discharge && typeof discharge === 'object') {
    if ('date' in discharge && 'criteria' in discharge) {
      if (isString(discharge.date) && isDate(discharge.date) && isString(discharge.criteria)) {
        return { date: discharge.date, criteria: discharge.criteria };
      }
    }
  }
  throw new Error('Incorrect or missing discharge');
};

const parseEmployerName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect or missing employer name');
  }
  return name;
};

const parseSickLeave = (leave: unknown): SickLeave => {
  if (leave && typeof leave === 'object') {
    if ('startDate' in leave && 'endDate' in leave) {
      if (isString(leave.startDate) && isDate(leave.startDate) && isString(leave.endDate) && isDate(leave.endDate)) {
        return { startDate: leave.startDate, endDate: leave.endDate };
      }
    }
  }
  throw new Error('Incorrect or missing sick leave');
};

const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating);
};

const isNumber = (number: unknown): number is number => {
  return typeof number === 'number' || number instanceof Number;
};

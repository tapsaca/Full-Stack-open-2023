import { v1 as uuid } from 'uuid';
import { Entry, NewEntryData, NewPatientData, NonSensitivePatientData, PatientData } from '../types';
import patientData from '../../data/patients';

const addPatient = (patient: NewPatientData): PatientData => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (patient: PatientData, entry: NewEntryData): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  patient.entries.push(newEntry);
  return newEntry;
};

const getPatientById = (id: string): PatientData | undefined => {
  return patientData.find((patient) => patient.id === id);
};

const getPatients = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default { addEntry, addPatient, getPatientById, getPatients };
import { v1 as uuid } from 'uuid';
import { NewPatientData, NonSensitivePatientData, PatientData } from '../types';
import patientData from '../../data/patients';

const addPatient = (patient: NewPatientData): PatientData => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patientData.push(newPatient);
  return newPatient;
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

export default { addPatient, getPatients };
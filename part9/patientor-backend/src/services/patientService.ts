import { Patient } from '../types';
import patientData from '../../data/patients';

const getPatients = (): Patient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default { getPatients };
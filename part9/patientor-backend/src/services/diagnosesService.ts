import { Diagnoses } from '../types';
import diagnosesData from '../../data/diagnoses';

const getDiagnoses = (): Diagnoses[] => {
  return diagnosesData;
};

export default { getDiagnoses };
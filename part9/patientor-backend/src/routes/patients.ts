import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientData } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  res.send(patientService.getPatientById(req.params.id));
});

router.post('/', (req, res) => {
  try {
    const newPatientData = toNewPatientData(req.body);
    const addedPatient = patientService.addPatient(newPatientData);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
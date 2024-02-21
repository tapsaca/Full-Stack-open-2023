import express from 'express';
import patientService from '../services/patientService';
import { toNewEntryData, toNewPatientData } from '../utils';

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

router.post('/:id/entries', (req, res) => {
  try {
    const newEntryData = toNewEntryData(req.body);
    const patient = patientService.getPatientById(req.params.id);
    if (!patient) {
      res.status(404).send('Patient not found.');
    } else {
      const addedEntry = patientService.addEntry(patient, newEntryData);
      res.json(addedEntry);
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
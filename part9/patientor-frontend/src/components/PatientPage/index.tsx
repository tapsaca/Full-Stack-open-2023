import { Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Diagnosis, Patient } from '../../types';
import patientService from '../../services/patients';
import EntryDetails from './EntryDetails';
import GenderIcon from './GenderIcon';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient>();
  const match = useMatch("patients/:id");

  useEffect(() => {
    const fetchPatient = async () => {
      if (match?.params.id) {
        const patient = await patientService.getPatientById(match?.params.id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, [match]);

  if (!patient) return null;

  return (
    <div>
      <h2>{patient.name} <GenderIcon gender={patient.gender} /></h2>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
      {patient.entries.length > 0 ? <h3>Entries</h3> : null}
      <Stack spacing={2}>
        {patient.entries.map((entry) => (
          <EntryDetails key={entry.id} diagnoses={diagnoses} entry={entry} />
        ))}
      </Stack>
    </div>
  );
};

export default PatientPage;
import { Alert, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Diagnosis, NewEntryData, Patient } from '../../types';
import patientService from '../../services/patients';
import AddEntryForm from './AddEntryForm';
import EntryDetails from './EntryDetails';
import GenderIcon from './GenderIcon';

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const [error, setError] = useState<string>();
  const [patient, setPatient] = useState<Patient>();
  const [showForm, setShowForm] = useState(false);
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

  const submitNewEntry = async (values: NewEntryData) => {
    try {
      if (patient && match?.params.id) {
        const entry = await patientService.createEntry(match.params.id, values);
        setPatient({...patient, entries: patient.entries.concat(entry)});
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) return null;

  return (
    <div>
      <h2>{patient.name} <GenderIcon gender={patient.gender} /></h2>
      <div>SSN: {patient.ssn}</div>
      <div>Occupation: {patient.occupation}</div>
      {error && <Alert severity="error">{error}</Alert>}
      <div>
        {showForm
          ? <AddEntryForm onSubmit={submitNewEntry} setShowForm={setShowForm} />
          : <Button style={{ marginTop: 20 }} variant="contained" onClick={() => setShowForm(true)}>Add New Entry</Button>
        }
      </div>
      <div>
        <Stack style={{ marginTop: 20 }} spacing={2}>
          {patient.entries.length > 0 ? <h3>Entries</h3> : null}
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} diagnoses={diagnoses} entry={entry} />
          ))}
        </Stack>
      </div>
    </div>
  );
};

export default PatientPage;
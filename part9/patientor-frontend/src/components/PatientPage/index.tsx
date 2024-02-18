import { useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Patient } from '../../types';
import patientService from '../../services/patients';
import GenderIcon from './GenderIcon';

const PatientPage = () => {
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
      <h3>Entries</h3>
      {patient.entries.map((entry) => (
        <div key={entry.id}>
          {entry.date} <i>{entry.description}</i>
          {entry.diagnosisCodes
            ? <ul>{entry.diagnosisCodes.map((code) => <li key={code}>{code}</li>)}</ul>
            : null
          }
        </div>
      ))}
    </div>
  );
};

export default PatientPage;
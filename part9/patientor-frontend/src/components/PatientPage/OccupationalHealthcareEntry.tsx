import WorkIcon from '@mui/icons-material/Work';
import { Diagnosis, Entry } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  entry: Entry;
}

const OccupationalHealthcareEntry = ({ diagnoses, entry }: Props) => {
  if (entry.type != 'OccupationalHealthcare') return null;

  return (
    <div>
      <div>{entry.date} <WorkIcon /> {entry.employerName}</div>
      <div><i>{entry.description}</i></div>
      {entry.diagnosisCodes
        ? <ul>{entry.diagnosisCodes.map((code) => <li key={code}>{code} {diagnoses.find((d) => d.code === code)?.name}</li>)}</ul>
        : null
      }
      {entry.sickLeave ? <div>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</div> : null}
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcareEntry;
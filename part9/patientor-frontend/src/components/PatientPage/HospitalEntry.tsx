import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Diagnosis, Entry } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  entry: Entry;
}

const HospitalEntry = ({ diagnoses, entry }: Props) => {
  if (entry.type != 'Hospital') return null;

  return (
    <div>
      <div>{entry.date} <LocalHospitalIcon /></div>
      <div><i>{entry.description}</i></div>
      {entry.diagnosisCodes
        ? <ul>{entry.diagnosisCodes.map((code) => <li key={code}>{code} {diagnoses.find((d) => d.code === code)?.name}</li>)}</ul>
        : null
      }
      <div>Discharge: {entry.discharge.date} {entry.discharge.criteria}</div>
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HospitalEntry;
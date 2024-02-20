import FavoriteIcon from '@mui/icons-material/Favorite';
import { Diagnosis, Entry, HealthCheckRating } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  entry: Entry;
}

const HealthCheckEntry = ({ diagnoses, entry }: Props) => {
  if (entry.type != 'HealthCheck') return null;

  return (
    <div>
      <div>{entry.date} <FavoriteIcon /></div>
      <div><i>{entry.description}</i></div>
      {entry.diagnosisCodes
        ? <ul>{entry.diagnosisCodes.map((code) => <li key={code}>{code} {diagnoses.find((d) => d.code === code)?.name}</li>)}</ul>
        : null
      }
      <div>Health: {HealthCheckRating[entry.healthCheckRating]}</div>
      <div>Diagnose by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheckEntry;
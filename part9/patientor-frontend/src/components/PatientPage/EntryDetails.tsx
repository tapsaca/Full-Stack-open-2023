import { Diagnosis, Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface Props {
  diagnoses: Diagnosis[];
  entry: Entry;
}

const EntryDetails = ({ diagnoses, entry }: Props) => {
  const assertNever = (value: never): never => {
    throw new Error(`Unhandled: ${JSON.stringify(value)}`);
  };

  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry diagnoses={diagnoses} entry={entry} />;
    case 'Hospital':
      return <HospitalEntry diagnoses={diagnoses} entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry diagnoses={diagnoses} entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
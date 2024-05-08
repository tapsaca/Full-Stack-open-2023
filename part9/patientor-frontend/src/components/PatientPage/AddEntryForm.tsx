import { Button, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { Diagnosis, HealthCheckRating, NewEntryData } from "../../types";

interface Props {
  diagnoses: Diagnosis[];
  onSubmit: (values: NewEntryData) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

interface HealthCheckOption {
  value: number;
  label: string;
}

const healthCheckOptions: HealthCheckOption[] = Object.values(HealthCheckRating)
  .filter(value => typeof value === "number")
  .map(v => ({
    value: Number(v), label: HealthCheckRating[Number(v)]
}));

const AddEntryForm = ({ diagnoses, setShowForm, onSubmit }: Props) => {
  const [criteria, setCriteria] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [employer, setEmployer] = useState("");
  const [endDate, setEndDate] = useState("");
  const [entryType, setEntryType] = useState("HealthCheck");
  const [specialist, setSpecialist] = useState("");
  const [startDate, setStartDate] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis["code"]>>([]);

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes
    };
    switch (entryType) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating,
        });
        break;
      case "Hospital":
        onSubmit({
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: criteria
          }
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName: employer,
          sickLeave: {
            startDate: startDate,
            endDate: endDate
          }
        });
        break;
    }
    setShowForm(false);
  };

  const handleDiagnosisChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      setDiagnosisCodes(event.target.value.split(", "));
    } else {
      setDiagnosisCodes(event.target.value);
    }
  };

  return (
    <div>
      <InputLabel style={{ marginTop: 20 }}>Entry Type</InputLabel>
      <Select
        fullWidth
        value={entryType}
        onChange={({ target }) => setEntryType(target.value)}
      >
        <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
        <MenuItem value={"Hospital"}>Hospital</MenuItem>
        <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
      </Select>
      <form onSubmit={addEntry}>
        <TextField
          style={{ marginTop: 10 }}
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          style={{ marginTop: 10 }}
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        {entryType === "HealthCheck" &&
          <Select
            style={{ marginTop: 10 }}
            fullWidth
            value={healthCheckRating}
            onChange={({ target }) => setHealthCheckRating(Number(target.value))}
          >
            {healthCheckOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        }
        <InputLabel style={{ marginTop: 10 }}>Diagnosis codes</InputLabel>
        <Select
          style={{ marginTop: 10 }}
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={handleDiagnosisChange}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} {diagnosis.name}
            </MenuItem>
          ))}
        </Select>
        {entryType === "Hospital" &&
          <>
            <InputLabel style={{ marginTop: 10 }}>Discharge</InputLabel>
            <TextField
              style={{ marginTop: 10 }}
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              style={{ marginTop: 10 }}
              label="Criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />
          </>
        }
        {entryType === "OccupationalHealthcare" &&
          <>
            <TextField
              style={{ marginTop: 10 }}
              label="Employer"
              fullWidth
              value={employer}
              onChange={({ target }) => setEmployer(target.value)}
            />
            <InputLabel style={{ marginTop: 10 }}>Sickleave</InputLabel>
            <InputLabel style={{ marginTop: 10 }}>Start Date</InputLabel>
            <TextField
              style={{ marginTop: 3 }}
              type="date"
              fullWidth
              value={startDate}
              onChange={({ target }) => setStartDate(target.value)}
            />
            <InputLabel style={{ marginTop: 10 }}>End Date</InputLabel>
            <TextField
              style={{ marginTop: 3 }}
              type="date"
              fullWidth
              value={endDate}
              onChange={({ target }) => setEndDate(target.value)}
            />
          </>
        }
        <Grid style={{ marginBottom: 60 }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left", marginTop: 10 }}
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{ float: "right", marginTop: 10 }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
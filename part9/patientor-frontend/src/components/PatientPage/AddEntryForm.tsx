import { Button, Grid, TextField } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { HealthCheckRating, NewEntryData } from "../../types";

interface Props {
  onSubmit: (values: NewEntryData) => void;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddEntryForm = ({ setShowForm, onSubmit }: Props) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const codes = diagnosisCodes.split(", ");
    onSubmit({
      description,
      date,
      specialist,
      type: 'HealthCheck',
      healthCheckRating,
      diagnosisCodes: codes
    });
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Healthcheck rating"
          fullWidth
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value))}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
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
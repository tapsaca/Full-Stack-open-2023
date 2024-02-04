import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(height, weight);
  return res.status(200).json({
    weight,
    height,
    bmi
  });
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }
  const hours = daily_exercises as number[];
  if (isNaN(Number(target)) || !Array.isArray(hours) || hours.some(isNaN)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }
  const result = calculateExercises(hours, Number(target));
  return res.status(200).json({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

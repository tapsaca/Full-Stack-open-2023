interface ExerciseResults {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  hours: number[],
  target: number
): ExerciseResults => {
  const average =
    hours.reduce((sum, currentValue) => sum + currentValue, 0) / hours.length;
  let rating: number;
  let ratingDescription;
  if (average >= target) {
    rating = 3;
    ratingDescription = 'good';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'meh';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }
  return {
    periodLength: hours.length,
    trainingDays: hours.length - hours.filter((h) => h === 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  };
};

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error('Provide at least two arguments.');
  if (isNaN(Number(args[2])))
    throw new Error('Provided arguments should be numbers');
  const hours: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided arguments should be numbers.');
    }
    hours.push(Number(args[i]));
  }
  return {
    target: Number(args[2]),
    hours
  };
};

try {
  const { target, hours } = parseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log(`Error: ${error.message}`);
  }
}

interface ExerciseResults {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (
  hours: number[],
  target: number
): ExerciseResults => {
  const average =
    hours.reduce((sum, currentValue) => sum + currentValue, 0) / hours.length
  let rating: number
  let ratingDescription
  if (average >= target) {
    rating = 3
    ratingDescription = 'good'
  } else if (average >= target * 0.75) {
    rating = 2
    ratingDescription = 'meh'
  } else {
    rating = 1
    ratingDescription = 'bad'
  }
  return {
    periodLength: hours.length,
    trainingDays: hours.length - hours.filter((h) => h === 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))

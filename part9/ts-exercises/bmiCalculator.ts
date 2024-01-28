const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2
  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi < 24.9) {
    return 'Normal (healthy weight)'
  } else if (bmi < 29.9) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

console.log(calculateBmi(180, 74))

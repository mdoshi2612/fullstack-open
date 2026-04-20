export const calculateBmi = (height: number, weight: number): string => {
  const heightInMetres: number = height / 100;
  const bmi: number = weight / (heightInMetres * heightInMetres);
  if (bmi <= 16) return 'Underweight (Severe thinness)';
  else if (bmi <= 17) return 'Underweight (Moderate thinness)';
  else if (bmi <= 18.5) return 'Underweight (Mild thinness)';
  else if (bmi <= 25) return 'Normal range';
  else if (bmi <= 30) return 'Overweight (Pre-obese)';
  else if (bmi <= 35) return 'Obese (Class I)';
  else if (bmi <= 40) return 'Obese (Class II)';
  else return 'Obese (Class III)';
};

if (process.argv[1] === import.meta.filename) {
  const height: number = Number(process.argv[2]);
  const weight: number = Number(process.argv[3]);

  console.log(calculateBmi(height, weight));
}

import { z } from 'zod';

export const GenderValues = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export type Gender = (typeof GenderValues)[keyof typeof GenderValues];

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const newPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Object.values(GenderValues)),
  occupation: z.string(),
});

export type NewPatient = z.infer<typeof newPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

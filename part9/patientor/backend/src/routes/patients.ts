import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import type { ProtectedPatientData, Patient } from '../types.ts';
import { toNewPatient } from '../utils.ts';

const router = express.Router();

router.get('/', (_req, res: Response<ProtectedPatientData[]>) => {
  const data: ProtectedPatientData[] =
    patientService.getAllProtectedPatientData();
  res.send(data);
});

router.post('/', (req, res: Response<Patient | string>) => {
  try {
    const newPatientEntry = toNewPatient(req.body);
    const newPatient = patientService.addPatient(newPatientEntry);
    res.send(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;

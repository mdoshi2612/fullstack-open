import express, {
  type Response,
  type Request,
  type NextFunction,
} from 'express';
import patientService from '../services/patientService.ts';
import {
  type ProtectedPatientData,
  type Patient,
  newPatientSchema,
} from '../types.ts';
import { errorHandlerMiddleware } from '../middleware/errorHandler.ts';

const router = express.Router();

router.get('/', (_req: Request, res: Response<ProtectedPatientData[]>) => {
  const data: ProtectedPatientData[] =
    patientService.getAllProtectedPatientData();
  res.send(data);
});

router.post(
  '/',
  (req: Request, res: Response<Patient>, next: NextFunction) => {
    const parsed = newPatientSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(parsed.error);
    }

    const newPatient = patientService.addPatient(parsed.data);
    res.json(newPatient);
  }
);

router.use(errorHandlerMiddleware);

export default router;

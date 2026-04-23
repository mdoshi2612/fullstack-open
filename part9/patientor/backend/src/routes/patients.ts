import express, {
  type Response,
  type Request,
  type NextFunction,
} from 'express';
import patientService from '../services/patientService.ts';
import {
  type NonSensitivePatient,
  type Patient,
  newPatientSchema,
} from '../types.ts';
import { errorHandlerMiddleware } from '../middleware/errorHandler.ts';

const router = express.Router();

router.get('/', (_req: Request, res: Response<NonSensitivePatient[]>) => {
  const data: Patient[] = patientService.getAllPatientData();
  res.send(data);
});

router.get(
  '/:id',
  (
    req: Request<{ id: string }>,
    res: Response<Patient | { error: string }>
  ) => {
    const id = req.params.id;
    const patient = patientService.getPatientById(id);
    if (!patient) {
      return res.status(404).json({ error: 'patient not found' });
    }
    return res.json(patient);
  }
);

router.post('/', (req: Request, res: Response<Patient>, next: NextFunction) => {
  const parsed = newPatientSchema.safeParse(req.body);
  if (!parsed.success) {
    return next(parsed.error);
  }

  const newPatient = patientService.addPatient(parsed.data);
  res.json(newPatient);
});

router.use(errorHandlerMiddleware);

export default router;

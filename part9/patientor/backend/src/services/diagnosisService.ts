import diagnosisData from '../../data/diagnoses.ts';
import type { Diagnosis } from '../types.ts';

const getAllDiagnosisData = (): Diagnosis[] => {
  return diagnosisData;
};

export default {
  getAllDiagnosisData,
};

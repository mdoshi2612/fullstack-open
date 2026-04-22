import patientData from '../../data/patients.ts';
import type { Patient, ProtectedPatientData, NewPatient } from '../types.ts';
import { v1 as uuid } from 'uuid';

const getAllPatientData = (): Patient[] => {
  return patientData;
};

const getAllProtectedPatientData = (): ProtectedPatientData[] => {
  return patientData.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patientData.push(newPatient);
  return newPatient;
};

export default {
  getAllPatientData,
  getAllProtectedPatientData,
  addPatient,
};

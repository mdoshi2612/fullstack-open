import patientData from '../../data/patients.ts';
import type { Patient, NonSensitivePatient, NewPatient } from '../types.ts';
import { v1 as uuid } from 'uuid';

const patients: Patient[] = patientData.map((patient) => ({
  ...patient,
  entries: patient.entries ?? [],
}));

const getAllPatientData = (): Patient[] => {
  return patients;
};

const getAllNonSensitivePatientData = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, gender, dateOfBirth, occupation }) => ({
    id,
    name,
    gender,
    dateOfBirth,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
    entries: [],
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getAllPatientData,
  getAllNonSensitivePatientData,
  getPatientById,
  addPatient,
};

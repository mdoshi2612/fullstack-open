import { type NewPatient, type Gender, GenderValues } from './types.ts';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isGender = (gender: unknown): gender is Gender => {
  if (!gender || !isString(gender)) {
    throw new Error('Incorrect or missing data');
  }
  return (Object.values(GenderValues) as string[]).includes(gender);
};

const parseGender = (value: unknown): Gender => {
  const gender = parseStringField(value, 'gender');
  if (!isGender(gender)) {
    throw new Error('Incorrect or missing data');
  }
  return gender;
};

const parseStringField = (value: unknown, fieldName: string): string => {
  if (!value || !isString(value)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }

  return value;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (value: unknown): string => {
  const date = parseStringField(value, 'dateOfBirth');
  if (!isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }

  return date;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object
  ) {
    const newPatient: NewPatient = {
      name: parseStringField(object.name, 'name'),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseStringField(object.ssn, 'ssn'),
      gender: parseGender(object.gender),
      occupation: parseStringField(object.occupation, 'occupation'),
    };

    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

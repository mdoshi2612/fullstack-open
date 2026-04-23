import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';

import patientService from '../../services/patients';
import { Gender, type Patient } from '../../types';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) {
        setError('Missing patient id');
        return;
      }

      try {
        const data = await patientService.getById(id);
        setPatient(data);
      } catch (e: unknown) {
        if (axios.isAxiosError(e) && e.response?.status === 404) {
          setError('Patient not found');
          return;
        }
        setError('Failed to load patient');
      }
    };

    void fetchPatient();
  }, [id]);

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!patient) {
    return <Typography>Loading patient...</Typography>;
  }

  const genderIcon =
    patient.gender === Gender.Female ? (
      <FemaleIcon
        sx={{ ml: 1, verticalAlign: 'middle', color: 'error.main' }}
      />
    ) : patient.gender === Gender.Male ? (
      <MaleIcon
        sx={{ ml: 1, verticalAlign: 'middle', color: 'primary.main' }}
      />
    ) : (
      <TransgenderIcon
        sx={{ ml: 1, verticalAlign: 'middle', color: 'text.secondary' }}
      />
    );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {patient.name}
        {genderIcon}
      </Typography>
      <Typography>SSN: {patient.ssn ?? 'N/A'}</Typography>
      <Typography>Date of birth: {patient.dateOfBirth ?? 'N/A'}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
    </Box>
  );
};

export default PatientPage;

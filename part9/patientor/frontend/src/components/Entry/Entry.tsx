import { Box, Typography } from '@mui/material';
import { type Entry } from '../../types';
import {
  type HealthCheckEntry,
  type OccupationalHealthcareEntry,
  type HospitalEntry,
} from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never) => {
  throw new Error('Unexpected value: ' + value);
};

const baseEntryStyle = {
  p: 2,
  mb: 2,
  border: '1px solid',
  borderColor: 'grey.400',
  borderRadius: 1,
};

const healthCheckColors = [
  'success.main',
  'warning.main',
  'error.light',
  'error.main',
] as const;

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
  const heartColor = healthCheckColors[entry.healthCheckRating] ?? 'error.main';

  return (
    <Box component="section" sx={baseEntryStyle}>
      <Typography>
        {entry.date} <LocalHospitalIcon fontSize="small" />
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      <Typography variant="body2">
        <FavoriteIcon sx={{ color: heartColor, verticalAlign: 'middle' }} />
      </Typography>
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box component="section" sx={baseEntryStyle}>
      <Typography>
        {entry.date} <MedicalServicesIcon fontSize="small" />
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      <Typography variant="body2">
        Discharge: {entry.discharge.date} ({entry.discharge.criteria})
      </Typography>
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const OccupationalHealthcare = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Box component="section" sx={baseEntryStyle}>
      <Typography>
        {entry.date} <WorkIcon fontSize="small" /> {entry.employerName}
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      {entry.sickLeave && (
        <Typography variant="body2">
          Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </Typography>
      )}
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

const Entry = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default Entry;

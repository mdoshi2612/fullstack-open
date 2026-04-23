import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses.ts';
import patientRouter from './routes/patients.ts';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

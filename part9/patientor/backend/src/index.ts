import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnoses.ts';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());
app.use('/api/diagnoses', diagnosisRouter);

app.get('/api/ping', (_req, res) => {
  console.log('Successfully pinged /api/ping');
  res.send('Successfully pinged /api/ping');
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));

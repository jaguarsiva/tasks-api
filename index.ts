import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { CronJob } from 'cron';
import routes from './routes';
import jobs from './jobs';
import db from './services/db';
import cors from 'cors';
import logger from './utils/logger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// use cors
app.use(cors({}));

// Setup database
db.setup();

app.use(express.json());
app.use('/api/v1', routes);

// Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  logger.error('error', error);

  if (error.status === 400) {
    const { status, ...errorBody } = error;
    res.status(400).json(errorBody);
  } else if (error.response) {
    res.status(error.response.status).json(error.response);
  } else {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  logger.info(`app listening on port ${port}`);
  logger.info(`app running in ${process.env.NODE_ENV} environment`);
});

// CRON Jobs

// Job running every 15 mins to keep the server awake
const wakeJob = new CronJob(
  '0 */14 * * * *',
  () => {
    logger.info('Keeping the server awake...');
  },
  null,
  true,
  'Asia/Kolkata'
);
wakeJob.start();

// Everyday at 11:00 PM, this job pushes every active tasks
const pushJob = new CronJob(
  '0 0 23 * * *',
  jobs.pushActiveTasksJob,
  null,
  true,
  'Asia/Kolkata'
);
pushJob.start();

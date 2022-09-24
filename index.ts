import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cron from 'node-cron';
import routes from './routes';
import jobs from './jobs';
import db from './services/db';
import cors from 'cors';

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
  // TODO: Error logging

  console.log(req.method, req.originalUrl);
  console.log(error);
  if (error.exception) {
    const { status, exception, ...errorBody } = error;
    res.status(status).json(errorBody);
  } else if (error.response) {
    res.status(error.response.status).json(error.response);
  } else {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log('app listening on port', port);
  console.log('app running in', process.env.NODE_ENV, 'environment');
});

// CRON Jobs

// Everyday at 11:30 PM, this job pushes every active tasks
cron.schedule('0 30 23 * * *', jobs.pushActiveTasksJob);

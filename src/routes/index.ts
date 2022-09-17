import express, { Request, Response } from 'express';
import healthCheck from './healthCheck';
import users from './users';
import tasks from './tasks';

const router = express.Router();

router.use('/health-check', healthCheck);
router.use('/users', users);
router.use('/tasks', tasks);

router.all('/*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Invalid API URL',
    message: 'Endpoint not found for ' + req.url,
  });
});

export default router;

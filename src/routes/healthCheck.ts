import express, { Request, Response } from 'express';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
  const date = new Date();
  res.status(200).json({
    date: date.toDateString(),
    time: date.toLocaleTimeString(),
    message: 'Server is up and running',
  });
});

export default router;

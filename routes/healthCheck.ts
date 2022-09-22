import express, { Request, Response } from 'express';
import moment from 'moment-timezone';

const router = express.Router();
router.get('/', (req: Request, res: Response) => {
  var now = moment().tz('India/Chennai');
  res.status(200).json({
    date: now.format('dddd, Do MMMM YYYY'),
    time: now.format('hh:mm:ss A'),
    message: 'Server is up and running'
  });
});

export default router;

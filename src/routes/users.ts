import express, { Request, Response } from 'express';
const router = express.Router();

// get all users
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({});
});

// get user by id
router.get('/:userid', (req: Request, res: Response) => {
  res.status(200).json({});
});

// add user
router.post('/', (req: Request, res: Response) => {
  res.status(200).json({});
});

// delete user by id
router.post('/:userid', (req: Request, res: Response) => {
  res.status(200).json({});
});

export default router;

import { Request, Response, NextFunction } from 'express';
import db from '../services/db';

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<ControllerResponse>;

interface ControllerResponse {
  body: any;
  status?: number;
  headers?: any;
}

export default function makeExpressCallback(controller: Controller) {
  return async function expressCallback(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await db.connect();
      const result = await controller(req, res, next);
      await db.disconnect();
      if (result) {
        const { headers, status = 200, body } = result;
        if (headers) res.set(headers);
        res.status(status).json(body);
      }
    } catch (error) {
      await db.disconnect();
      next(error);
    }
  };
}

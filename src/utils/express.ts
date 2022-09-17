import { Request, Response, NextFunction } from 'express';

type Controller = (req: Request, res: Response, next: NextFunction) => string;

export default function makeExpressCallback(controller: Controller) {
  return async function expressCallback(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (error) {
    } finally {
    }
  };
}

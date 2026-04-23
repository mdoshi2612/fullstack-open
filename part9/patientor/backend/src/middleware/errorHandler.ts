import { z } from 'zod';
import { type Request, type Response, type NextFunction } from 'express';

export const errorHandlerMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

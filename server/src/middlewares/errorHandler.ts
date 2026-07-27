import { Response, Request, NextFunction } from "express";
import { ZodError } from "zod";
import { logger } from "../utils/logger";

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    logger.warn(`Validation Error [${req.method} ${req.originalUrl}]`, {
      issues: err.issues,
    });
    return res.status(400).send({
      message: "Validation Error",
      errors: err.issues,
    });
  }

  if (err instanceof Error) {
    logger.error(`Error handling request [${req.method} ${req.originalUrl}]: ${err.message}`, err);
    return res.status(400).send({
      message: "Bad Request",
      errors: err.message,
    });
  }

  logger.error(`Unhandled Error [${req.method} ${req.originalUrl}]`, err);
  return res.status(500).send({
    message: "Internal Server Error",
    errors: err instanceof Error ? err.message : String(err),
  });
};
import {Response, Request, NextFunction} from "express";
import {ZodError} from "zod";

export const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    console.error(err.message)
    return res.status(400).send({
      message: "Validation Error",
      errors: err.issues
    });
  }
  if (err instanceof Error) {
    console.error(err.message)
    return res.status(400).send({
      message: "Bad Request",
      errors: err.message
    })
  }
  return res.status(500).send({
    message: "Internal Server Error",
    errors: err instanceof Error ? err.message : String(err)
  })
}
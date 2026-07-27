import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const { method, originalUrl, ip } = req;

  const hasBody = req.body && Object.keys(req.body).length > 0;
  const hasQuery = req.query && Object.keys(req.query).length > 0;

  logger.info(`HTTP INCOMING: ${method} ${originalUrl}`, {
    ip,
    ...(hasQuery ? { query: req.query } : {}),
    ...(hasBody ? { body: sanitizeBody(req.body) } : {}),
  });

  res.on("finish", () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    const message = `HTTP RESPONSE: ${method} ${originalUrl} ${statusCode} - ${duration}ms`;

    if (statusCode >= 400) {
      logger.warn(message);
    } else {
      logger.info(message);
    }
  });

  next();
};

function sanitizeBody(body: any): any {
  if (typeof body !== "object" || body === null) return body;
  const copy = { ...body };
  if (copy.password) copy.password = "***HIDDEN***";
  if (copy.token) copy.token = "***HIDDEN***";
  return copy;
}

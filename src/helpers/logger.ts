import * as winston from 'winston';

export interface Logger {
  transactionId?: string;
  service?: string;
  payload?: unknown;
  cacheHit?: boolean;
  operation?: string;
  errorMessage?: string;
  message?: string[];
  stack?: unknown;
}

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});
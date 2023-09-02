import winston from 'winston';
import env from './env';

const { colorize, combine, label, printf, timestamp } = winston.format;

const myFormat = printf(
  ({ level, message, label, timestamp }) =>
    `${timestamp} [${label}] ${level}: ${message}`,
);

const buildFormat = (name?: string) =>
  combine(
    ...[
      colorize(),
      ...(name ? [label({ label: name })] : []),
      timestamp(),
      myFormat,
    ],
  );

const buildLogger = (name: string) =>
  winston.createLogger({
    level: env.nodeEnv === 'production' ? 'info' : 'debug',
    format: buildFormat(name),
    transports: [new winston.transports.Console()],
  });

export default buildLogger;

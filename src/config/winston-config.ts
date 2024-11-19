import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

// Custom format to handle error stack trace
const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    // If it's an error, include the stack trace
    if (stack) {
      return `${timestamp} [${level}]: ${message}\n${stack}`;
    }
    return `${timestamp} [${level}]: ${message}`;
  }),
);

const logger = winston.createLogger({
  level: 'info', // You can adjust this to your preferred log level
  format: logFormat,
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),

    // Daily rotate file transport
    new DailyRotateFile({
      filename: 'logs/%DATE%-app.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
    }),
  ],
});

export default logger;

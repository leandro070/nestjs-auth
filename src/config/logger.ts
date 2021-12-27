import { LoggerService } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export function getConfigLogger(): LoggerService {
  return WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          winston.format.ms(),
          utilities.format.nestLike('Lucky', { prettyPrint: true }),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'info',
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          winston.format.align(),
          winston.format.errors({ stack: true }),
          winston.format.printf(
            (info) =>
              `${info.level} - ${[info.timestamp]} [${info.context}] : ${
                info.message
              }${info.stack ? ' - ' + JSON.stringify(info.stack) : ''}`,
          ),
        ),
      }),
    ],
  });
}

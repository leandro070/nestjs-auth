import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl, body } = request;
    const message = `START [${method}] ${originalUrl}${
      method !== 'GET' ? ' Body: ' + JSON.stringify(body) : ''
    }`;
    this.logger.log(message, 'LogsMiddleware');

    response.on('finish', () => {
      const { statusCode, statusMessage } = response;
      const message = `END (${statusCode}) [${method}] ${originalUrl} ${statusMessage}`;

      if (statusCode >= 500) {
        return this.logger.warn(message);
      }

      if (statusCode >= 400) {
        return this.logger.log(message);
      }

      return this.logger.log(message);
    });

    next();
  }
}

export default LogsMiddleware;

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { customLogger } from '../../commons/logger';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    customLogger.log(`Solicitud entrante: ${req.method} ${req.originalUrl}`);
    next();
  }
}

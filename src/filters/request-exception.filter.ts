import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

@Catch(HttpException)
export class RequestExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const { message, code } = exception.getResponse() as any;

    const logFormat = ` 
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    Request original url: ${request.originalUrl}
    Method ${request.method} 
    IP: ${request.ip}
    Status code: ${code}
    Params: ${JSON.stringify(request.params)}
    Query: ${JSON.stringify(request.query)}
    Body: ${JSON.stringify(request.body)}
    Exception: ${message}
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
    Logger.error(logFormat);

    response.status(status).json({
      code: code || status,
      timestamp: new Date().toLocaleString(),
      path: request.url,
      message: Array.isArray(message) ? message[0] : message,
    });
  }
}

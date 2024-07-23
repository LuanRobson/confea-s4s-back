import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
  } from '@nestjs/common';
  import { ValidationError } from 'class-validator';
  import { Request, Response } from 'express';
  import { Logger } from '../helpers/logger';
  
  @Catch()
  export class Warning extends HttpException implements ExceptionFilter {
    public readonly message: string;
    public readonly code: number;
    public readonly logger: Logger;
  
    constructor(message: unknown, code = 500, logger: Logger = {}) {
      super(message, code);
      this.code = code;
      this.logger = logger;
  
      if (typeof message === 'string') {
        this.message = message;
      }
  
      if (Array.isArray(message) && typeof message[0] === 'string') {
        this.message = message.join(', ');
      }
  
      if (Array.isArray(message) && message[0] instanceof ValidationError) {
        const errors: string[] = message.map((value) => {
          const key = Object.keys(value.constraints).pop();
          return value.constraints[key];
        });
  
        this.message = errors.join(', ');
      }
    }
  
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
  
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: this.message,
      });
    }
  }
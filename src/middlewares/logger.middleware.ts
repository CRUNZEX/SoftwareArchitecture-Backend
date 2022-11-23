import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(request: Request, response: Response, next: NextFunction) {
        console.log(`>> ${new Date().toISOString()} | ${request.method}: ${request.originalUrl}`);

        if (Object.keys(request.body).length > 0) {
            console.log(request.body);
        }
        next();
    }
}

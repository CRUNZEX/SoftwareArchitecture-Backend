import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { ResponseHandler } from '../res';

@Injectable()
export class AuthMiddleware extends ResponseHandler implements NestMiddleware {
    constructor() {
        super();
    }

    use(request: Request, response: Response, next: NextFunction): Response {
        const token = request.headers.authorization;

        if (!token) {
            return response.status(401).json(this.responseUnauthorized(`unauthrorized at ${request.url}`))
        } else {
            try {
                const userDecode = jwt.verify(token, process.env.JWT_SECERT);
                request.user = userDecode;
                next();
            } catch (err) {
                return response.status(403).json(this.responseForbidden(`access denied at ${request.url}`));
            }
        }
    }
}

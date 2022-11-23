import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { request, Request, Response } from 'express';
import { globalConfig } from 'src/config/global.config';
import { AuthService } from '../services/auth.service';

import { resHeader } from 'src/res';

@Controller('register')
export class RegisterController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async register(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.authService.register(request.body);
        return response.status(data.statusCode).json(data);
    }
}

import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import express, { Request, Response } from 'express';
import { globalConfig } from 'src/config/global.config';

import { RegisterService } from '../services/registration.service';

@Controller('registration')
export class RegistrationController {
    constructor(private readonly registrationService: RegisterService) {}

    @Post()
    async registration(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.registrationService.registration(request.user, request.body);
        return response.status(data.statusCode).json(data);
    }

    @Get()
    async getProfile(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.registrationService.getProfile(request.user);
        return response.status(data.statusCode).json(data);
    }
}

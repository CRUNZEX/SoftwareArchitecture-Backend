import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    Res,
    HttpStatus,
    ParseIntPipe,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';

import express, { Request, Response } from 'express';
import { globalConfig } from 'src/config/global.config';
import { userAppointmentInterface } from '../interface/userAppointment.interface';
import { UserAppointmentService } from '../services/userAppointment.service';

@Controller('user-appointment')
export class UserAppointmentController {
    constructor(private readonly userAppointmentService: UserAppointmentService) {}

    @Post()
    async addDataPatient(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.userAppointmentService.addDataPatient(
            request.user,
            request.body,
        );
        return response.status(data.statusCode).json(data);
    }

    @Get('old')
    async getNonAppointmentOld(@Req() request: Request, @Res() response: Response) {
        const data = await this.userAppointmentService.getNonAppointmentOld(request.user);
        return response.status(data.statusCode).json(data);
    }

    @Get('new')
    async getNonAppointmentNew(@Req() request: Request, @Res() response: Response) {
        const data = await this.userAppointmentService.getNonAppointmentNew(request.user);
        return response.status(data.statusCode).json(data);
    }

    @Get('history')
    async getHistory(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.userAppointmentService.getHistory(request.user);
        return response.status(data.statusCode).json(data);
    }

    @Put('update')
    async  updateNonAppointment(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.userAppointmentService.updateNonAppointment(request.body);
        return response.status(data.statusCode).json(data);
    }
}

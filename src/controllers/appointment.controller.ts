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
import { FileInterceptor } from '@nestjs/platform-express';

import { AppointmentService } from '../services/appointment.service';
import { globalConfig } from 'src/config/global.config';

@Controller('appointment')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async addAppointment(
        @UploadedFile() file: Express.Multer.File,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<Response> {
        const data = await this.appointmentService.addAppointment(
            request.user,
            JSON.parse(JSON.stringify(request.body)),
            file,
        );
        return response.status(data.statusCode).json(data);
    }

    @Get('History')
    async getHistory(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.appointmentService.getHistory(request.user);
        return response.status(data.statusCode).json(data);
    }

    // staff only
    @Get()
    async getPatient(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.appointmentService.getPatient(request.user);
        return response.status(data.statusCode).json(data);
    }

}

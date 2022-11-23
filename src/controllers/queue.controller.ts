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
import { QueueInterface } from '../interface/queue.interface';
import { QueueService } from '../services/queue.service';

@Controller('queue')
export class QueueController {
    constructor(private readonly QueueService: QueueService) {}

    @Post()
    async addQueue(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.QueueService.addQueue(request.user, request.body);
        return response.status(data.statusCode).json(data);
    }

    @Get(':id_appointment')
    async getStatusQueue(@Req() request: Request, @Res() response: Response) {
        const data = await this.QueueService.getStatusQueue(
            request.user,
            request.params.id_appointment,
        );
        return response.status(data.statusCode).json(data);
    }
    
    @Delete('dequeue')
    async deleteQueue(@Req() request: Request, @Res() response: Response) {
        const data = await this.QueueService.deleteQueue(request.body);
        return response.status(data.statusCode).json(data);
    }

    @Get()
    async getQueueLength(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.QueueService.getQueueLength();
        return response.status(data.statusCode).json(data);
    }
}

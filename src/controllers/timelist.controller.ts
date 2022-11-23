import { Body, Controller, Delete, Get, Param, Post, Res, ParseIntPipe, Req } from '@nestjs/common';
import express, { Request, Response } from 'express';
import { globalConfig } from '../config/global.config';

import { TimelistService } from '../services/timelist.service';

@Controller('timelist')
export class TimelistController {
    constructor(private readonly timelistService: TimelistService) {}

    @Get()
    async getTimelist(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.timelistService.getTimelist();
        return response.status(data.statusCode).json(data)
    }
}
import { Body, Controller, Get, Res, HttpStatus, Req, Post } from '@nestjs/common';
import express, { Request, Response } from 'express';
import { globalConfig } from '../config/global.config';

import { MapService } from '../services/map.service';

@Controller('map')
export class MapController {
    constructor(private readonly mapService: MapService) {}

    @Post()
    async calculationPosition(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.mapService.calculationPosition(request.body)
        return response.status(data.statusCode).json(data)
    }
}
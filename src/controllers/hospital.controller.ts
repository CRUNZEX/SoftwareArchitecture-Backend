import { Body, Controller, Get, Res, HttpStatus, Req } from '@nestjs/common';
import { HospitalInterface } from '../interface/hospital.interface';
import { HospitalService } from '../services/hospitals.service';

import express, { Request, Response } from 'express';
import { globalConfig } from 'src/config/global.config';
import { ServiceInterface } from 'src/interface/service.interface';

@Controller('hospital')
export class HospitalController {
    constructor(private readonly hospitalService: HospitalService) {}

    @Get()
    async getHospitalList(@Req() request: Request, @Res() response: Response) {
        const data = await this.hospitalService.getHospitalList();
        return response.status(data.statusCode).json(data);
    }

    @Get('search/:keyword')
    async getSearch(@Req() request: Request, @Res() response: Response) {
        const data = await this.hospitalService.getHospitalSearch(request.params.keyword);
        return response.status(data.statusCode).json(data);
    }

    @Get('update')
    async getHospitalUpdate(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.hospitalService.updateHospitalList();
        return response.status(HttpStatus.OK).json(data);
    }
}

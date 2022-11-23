import { Body, Controller, Delete, Get, Param, Post, Res, ParseIntPipe, Req } from '@nestjs/common';
import express, { Request, Response } from 'express';
import { StaffInterface } from '../interface/staff.interface';
import { StaffService } from '../services/staff.service';
import { ResponseInterface } from 'src/res/response.interface';
import { globalConfig } from 'src/config/global.config';

@Controller('staff')
export class StaffController {
    constructor(private readonly staffService: StaffService) {}

    @Post()
    async addStaff(
        @Body() createStaff: StaffInterface,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<Response> {
        const addDataStaff = await this.staffService.addStaff(request.user, createStaff);
        return response.status(addDataStaff.statusCode).json(addDataStaff);
    }

    @Get(':id')
    async getStaff(@Param('id') id: string, @Res() response: Response): Promise<Response> {
        const getDataStaff = await this.staffService.getStaffIdCard(id);
        return response.status(getDataStaff.statusCode).json(getDataStaff);
    }
}

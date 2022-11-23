import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { request, Request, Response } from 'express';
import { globalConfig } from 'src/config/global.config';

@Controller('practice')
export class PracticeController {
    constructor() {}

    @Get()
    async Practice(@Req() request: Request, @Res() response: Response): Promise<Response> {
        return response.status(200).json({
            statusCode: 200,
            message: 'success',
        });
    }
}

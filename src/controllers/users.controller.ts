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
} from '@nestjs/common';
import express, { Request, Response } from 'express';

import { User } from '../database/user.entity';
import { UsersService } from '../services/users.service';
import { globalConfig } from 'src/config/global.config';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // @Post()
    // async addUser(@Req() request: Request, @Res() response: Response): Promise<Response> {
    //     const data = await this.usersService.addUser(request.body);
    //     return response.status(data.statusCode).json(data);
    // }

    @Get()
    async getUserById(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.usersService.getUserById(request.user);
        return response.status(data.statusCode).json(data);
    }

    @Put()
    async updateUser(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.usersService.updateUser(request.user, request.body);
        return response.status(data.statusCode).json(data);
    }
}

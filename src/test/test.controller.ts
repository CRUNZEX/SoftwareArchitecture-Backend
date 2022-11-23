import { Controller, Get, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';

import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import sha256 from 'fast-sha256';

import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService) {}

    @Get('practice')
    getTest(@Req() request: Request, @Res() response: Response) {
        response.status(200).json({
            statusCode: 200,
            message: 'success',
        });
    }

    @Post('register')
    async register(@Req() request: Request, @Res() response: Response) {
        const { email, id_card, password } = request.body;

        const encryptedPassword = await bcrypt.hash(sha256(password).toString(), 10);

        const userPayload = {
            email,
            id_card,
            password: encryptedPassword,
        };
        console.log(userPayload);
        const token = jwt.sign({ email, id_card }, process.env.JWT_SECERT, { expiresIn: '1d' });
        console.log(token);
        response.status(200).json({ token });
    }

    @Post('login')
    async login(@Req() request: Request, @Res() response: Response) {
        const { email, id_card, password } = request.body;
        const token = jwt.sign({ email, id_card }, process.env.JWT_SECERT, { expiresIn: '1d' });
        console.log(token);
        response.status(200).json({ token });
    }

    @UseInterceptors(FileInterceptor('file'))
    @Post('upload')
    async uploadPicture(
        @UploadedFile() file: Express.Multer.File,
        @Req() request: Request,
        @Res() response: Response,
    ): Promise<Response> {
        const data = await this.testService.uploadPicture(file);
        return response.status(200).json({ data });
    }

    @Get('upload')
    async getPicture(@Req() request: Request, @Res() response: Response): Promise<Response> {
        const data = await this.testService.getPicture(request.body.file_name);
        return response.status(200).json({ data });
    }
}

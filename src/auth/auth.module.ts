import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Auth } from './auth.entity';
import { RegisterController } from './controllers/register.controller';
import { LoginController } from './controllers/login.controller';
import { PracticeController } from './controllers/practice.controller';
import { AuthService } from './services/auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([Auth])],
    controllers: [RegisterController, LoginController, PracticeController],
    providers: [AuthService],
})
export class AuthModule {}

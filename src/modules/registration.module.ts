import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Registration } from '../database/registration.entity';
import { RegistrationController } from '../controllers/registration.controller';
import { RegisterService } from '../services/registration.service';

import { User } from '../database/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Registration, User])],
    controllers: [RegistrationController],
    providers: [RegisterService],
})
export class RegistrationModule {}

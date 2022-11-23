import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../database/user.entity';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services/users.service';

import { Registration } from '../database/registration.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Registration])],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAppointment } from '../database/userAppointment.entity';
import { UserAppointmentController } from '../controllers/userAppointment.controller';
import { UserAppointmentService } from '../services/userAppointment.service';

import { Staff } from '../database/staff.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserAppointment, Staff])],
    controllers: [UserAppointmentController],
    providers: [UserAppointmentService],
})
export class UserAppointmentModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Appointment } from '../database/appointment.entity';
import { AppointmentController } from '../controllers/appointment.controller';
import { AppointmentService } from '../services/appointment.service';

import { Hospital } from '../database/hospital.entity';
import { Staff } from 'src/database/staff.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Appointment, Hospital, Staff])],
    controllers: [AppointmentController],
    providers: [AppointmentService],
})
export class AppointmentModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Queue } from '../database/queue.entity';
import { QueueController } from '../controllers/queue.controller';
import { QueueService } from '../services/queue.service';

import { Appointment } from '../database/appointment.entity';
import { UserAppointment } from '../database/userAppointment.entity';
import { Staff } from '../database/staff.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Queue, Appointment, UserAppointment, Staff])],
    controllers: [QueueController],
    providers: [QueueService],
})
export class QueueModule {}

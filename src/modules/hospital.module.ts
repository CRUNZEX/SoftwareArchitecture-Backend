import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hospital } from '../database/hospital.entity';
import { HospitalController } from '../controllers/hospital.controller';
import { HospitalService } from '../services/hospitals.service';

@Module({
    imports: [TypeOrmModule.forFeature([Hospital])],
    controllers: [HospitalController],
    providers: [HospitalService],
})
export class HospitalModule {}

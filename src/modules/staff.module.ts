import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from '../database/staff.entity';
import { StaffController } from '../controllers/staff.controller';
import { StaffService } from '../services/staff.service';

@Module({
    imports: [TypeOrmModule.forFeature([Staff])],
    controllers: [StaffController],
    providers: [StaffService],
})
export class StaffModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hospital } from '../database/hospital.entity';
import { MapController } from '../controllers/map.controller';
import { MapService } from '../services/map.service';

@Module({
    imports: [TypeOrmModule.forFeature([Hospital])],
    controllers: [MapController],
    providers: [MapService]
})
export class MapModule {}
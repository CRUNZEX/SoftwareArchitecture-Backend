import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimelistController } from '../controllers/timelist.controller';
import { TimelistService } from '../services/timelist.service';

@Module({
    imports: [],
    controllers: [TimelistController],
    providers: [TimelistService],
})
export class TimelistModule {}
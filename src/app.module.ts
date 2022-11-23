import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { TestModule } from './test/test.module';
import {
    AppointmentModule,
    HospitalModule,
    MapModule,
    QueueModule,
    RegistrationModule,
    StaffModule,
    TimelistModule,
    UserAppointmentModule,
    UsersModule,
} from './modules';

import { configService } from './config/config';

import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        AuthModule,
        TestModule,
        AppointmentModule,
        HospitalModule,
        MapModule,
        QueueModule,
        RegistrationModule,
        StaffModule,
        TimelistModule,
        UserAppointmentModule,
        UsersModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({
                path: '*',
                method: RequestMethod.ALL,
            });

        // apply auth
        consumer
            .apply(AuthMiddleware)
            .exclude('api/(register|login)')
            .forRoutes({
                path: '*',
                method: RequestMethod.ALL,
            })
    }
}

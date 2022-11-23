import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserAppointment } from '../database/userAppointment.entity';
import { userAppointmentInterface,updateAppointmentInterface } from '../interface/userAppointment.interface';
import { configUserAppointment } from 'src/config/userAppointment.config';

import { Staff } from '../database/staff.entity';

import { ResponseHandler, ResponseInterface } from '../res';

@Injectable()
export class UserAppointmentService extends ResponseHandler {
    constructor(
        @InjectRepository(UserAppointment)
        private readonly userAppointmentRepository: Repository<UserAppointment>,
        @InjectRepository(Staff)
        private readonly staffRepository: Repository<Staff>,
    ) {
        super();
    }

    async addDataPatient(
        user,
        dataPatient: userAppointmentInterface
    ): Promise<ResponseInterface> {
        const userAppointment = new UserAppointment();
        try {
            // logic
            configUserAppointment.keys.forEach((key) => {
                userAppointment[key] = dataPatient[key];
            });

            userAppointment.id_card = user.id_card;

            const newPatient = await this.userAppointmentRepository.save(userAppointment);
            return !newPatient
                ? this.responseBadRequest('cannot add patients')
                : this.responseOK(newPatient);
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }
    async getNonAppointmentOld(staff): Promise<ResponseInterface> {
        try {
            // check Role Staff
            const staffFind = await this.staffRepository.findOneBy({ id_card: staff.id_card });
            if (!staffFind) {
                return this.responseUnauthorized('staff only');
            }
            // logic
            const data = await this.userAppointmentRepository.find({
                where: [{ status: 'prepare', appointment_type: 'nonAppointmentOld' }],
            });
            return !data
                ? this.responseBadRequest('cannot get appointment')
                : this.responseOK(data);
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async getNonAppointmentNew(staff): Promise<ResponseInterface> {
        try {
            // check Role Staff
            const staffFind = await this.staffRepository.findOneBy({ id_card: staff.id_card });
            if (!staffFind) {
                return this.responseUnauthorized('staff only');
            }
            const data = await this.userAppointmentRepository.find({
                where: [{ status: 'prepare', appointment_type: 'nonAppointmentNew' }],
            });
            return !data
                ? this.responseBadRequest('cannot get appointment')
                : this.responseOK(data);
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async getHistory(user): Promise<ResponseInterface> {
        try {
            const findAppointment = await this.userAppointmentRepository.findOneBy({ id_card: user.id_card });
            if (findAppointment) {
                return this.responseOK(findAppointment);
            }
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async updateNonAppointment(dataUpdate: updateAppointmentInterface): Promise<ResponseInterface> {
        try {
            await this.userAppointmentRepository.query(
                `UPDATE user_appointment SET status='prepare', appointment_type='nonAppointmentOld', appointment_time='${dataUpdate.appointment_time}', appointment_date='${dataUpdate.appointment_date}',id_hospital='${dataUpdate.id_hospital}' WHERE id_user_appointment='${dataUpdate.id_user_appointment}'`
            )
            return this.responseOK();
        } catch (err) {
            return this.responseBadRequest(err.messa);
        }
    }
}

import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from '../database/queue.entity';
import { QueueInterface,DeQueueInterface } from '../interface/queue.interface';
import { configQueue } from 'src/config/queue.config';
// import { ResponseInterface } from '../interface/response.interface';
import { Appointment } from '../database/appointment.entity';
import { UserAppointment } from '../database/userAppointment.entity';
import { Staff } from '../database/staff.entity';

// import { AppointmentInterface } from '../appointment/interface/appointment.interface';
// import { AppointmentService } from '../appointment/appointment.service';

import { ResponseHandler } from 'src/res/response.config';
import { ResponseInterface } from 'src/res/response.interface';

@Injectable()
export class QueueService extends ResponseHandler {
    constructor(
        @InjectRepository(Queue)
        private readonly queueRepository: Repository<Queue>,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(UserAppointment)
        private readonly userAppointmentRepository: Repository<UserAppointment>,
        @InjectRepository(Staff)
        private readonly staffRepository: Repository<Staff>,
    ) {
        super();
    }

    async addQueue(staff, queue): Promise<ResponseInterface> {
        const queueObj = new Queue();
        try {
            // validation

            // check role staff
            const staffFind = await this.staffRepository.findOneBy({ id_card: staff.id_card });
            if (!staffFind) {
                return this.responseUnauthorized('staff only');
            }

            // logic
            configQueue.keys.forEach((key) => {
                queueObj[key] = queue[key];
            });
            queueObj.id_staff = staff.id_card;

            const queueAdd = await this.queueRepository.save(queueObj);
            
            let condition;
            let updateStatus;
            if (queue.appointment_type == 'appointment') {
                condition = { id_appointment: queue.id_appointment };
                updateStatus = await this.appointmentRepository.update(condition, {
                    status: queue.status,
                });
                if (updateStatus) {
                    return this.responseOK();
                }
            } else {
                updateStatus = await this.userAppointmentRepository.query(
                    `UPDATE user_appointment SET status='${queue.status}' WHERE id_user_appointment='${queue.id_appointment}' AND appointment_type='${queue.appointment_type}'`
                )
                if (updateStatus) {
                    return this.responseOK();
                }
            }
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async getStatusQueue(staff, id_appointment: string): Promise<ResponseInterface> {
        try {
            const staffFind = await this.staffRepository.findOneBy({ id_card: staff.id_card });
            if (!staffFind) {
                return this.responseUnauthorized('staff only');
            }

            const statusQueue = await this.queueRepository.findBy({
                id_appointment: id_appointment,
            });

            return !statusQueue ? this.responseBadRequest() : this.responseOK(statusQueue);
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async getQueueLength(): Promise<ResponseInterface> {
        try {
            const date = new Date().toLocaleDateString('th-TH');

            const [
                arrAppointment, 
                arrUserAppointment, 
                arrQueue
            ] = await Promise.all([
                this.appointmentRepository.find({}), 
                this.userAppointmentRepository.find({}),
                this.queueRepository.find({}),
            ])

            const groupAppointment = await Promise.all(
                arrQueue.map((queue: Queue) => {
                    if (queue.appointment_type == 'appointment') {
                        for (const appointment of arrAppointment) {
                            if (appointment.id_appointment == queue.id_appointment) {
                                return {
                                    ...queue,
                                    id_hospital: appointment.id_hospital
                                }
                            }
                        }
                    }
                    else {
                        for (const userAppointment of arrUserAppointment) {
                            if (userAppointment.id_user_appointment == queue.id_appointment) {
                                return {
                                    ...queue,
                                    id_hospital: userAppointment.id_hospital
                                }
                            }
                        }
                    }
                })
            )
            
            let convertAppointment = {}
            for (const appointment of groupAppointment) {
                if (!convertAppointment.hasOwnProperty(appointment.id_hospital.toString())) {
                    convertAppointment[appointment.id_hospital.toString()] = [appointment]
                }
                else {
                    convertAppointment[appointment.id_hospital.toString()].push(appointment)
                }
            }

            const convertQueue = await Promise.all(Object.keys(convertAppointment).map((key) => {
                let objQueue = {}
                for (const appointment of convertAppointment[key]) {
                    if (!objQueue.hasOwnProperty(appointment.q_time)) {
                        objQueue[appointment.q_time] = [appointment]
                    }
                    else {
                        objQueue[appointment.q_time].push(appointment)
                    }
                }
                return objQueue
            }))
                
            return this.responseOK(convertQueue);

            const queueList = await this.queueRepository.query(
                'SELECT q_date,q_time, COUNT(id_appointment) AS patients FROM queue GROUP BY q_date,q_time',
            );
            if (queueList.length > 0) {
                const queueListTemplate = await Promise.all(
                    configQueue.timeList.map((timeStr) => {
                        return {
                            q_date: date,
                            q_time: timeStr,
                            patients: '0',
                        };
                    }),
                );
                const queueListConvert = await Promise.all(
                    queueListTemplate.map((template) => {
                        for (const queue of queueList) {
                            if (template.q_time == queue.q_time) {
                                template = queue;
                            }
                        }
                        return template;
                    }),
                );

                return this.responseOK(queueListConvert);
            } else {
                return this.responseCreated();
            }
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async deleteQueue(id_queue:DeQueueInterface): Promise<ResponseInterface> {
        try {
            const deQueue = await this.queueRepository.query(
                `DELETE FROM queue WHERE id_q='${id_queue.id_q}'`
            )
            if (deQueue) {
                return this.responseOK();
            }

        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    
    // async nextQueue(id_queue:DeQueueInterface): Promise<ResponseInterface> {
    //     try {
    //         const deQueue = await this.queueRepository.query(
    //             `DELETE FROM queue WHERE id_q='${id_queue.id_q}'`
    //         )
    //         if (deQueue) {
    //             return this.responseOK();
    //         }

    //     } catch (err) {
    //         return this.responseBadRequest(err.message);
    //     }
    // }
    
}

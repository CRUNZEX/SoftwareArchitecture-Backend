import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/user.entity';
import { Appointment } from '../database/appointment.entity';
import { AppointmentInterface } from '../interface/appointment.interface';
import { configAppointment } from 'src/config/appointment.config';
import { Hospital } from '../database/hospital.entity';
import { Staff } from '../database/staff.entity';

import { ResponseHandler } from 'src/res/response.config';
import { ResponseInterface } from 'src/res/response.interface';

import * as firebase from 'firebase-admin';
import { firebaseAdmin, FirebaseService } from 'src/config/firebase.config';

@Injectable()
export class AppointmentService extends ResponseHandler {
    private firebaseAdmin: firebase.app.App;
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Hospital)
        private readonly hospitalRepository: Repository<Hospital>,
        @InjectRepository(Staff)
        private readonly staffRepository: Repository<Staff>,
    ) {
        super();
        const firebaseConnect = new FirebaseService()
        this.firebaseAdmin = firebaseConnect.firebaseService;
    }


    async addAppointment(user, dataAppointment: AppointmentInterface, file: Express.Multer.File) {
        const appointment = new Appointment();
        try {
            // validation
            if (!file) {
                throw new Error('must have appointment file');
            }

            // find hospital id
            // const

            // logic
            configAppointment.keys.forEach((key) => {
                appointment[key] = dataAppointment[key];
            });
            // appointment.id_hospital = id_hospital;
            appointment.id_card = user.id_card;
            const findHospital = <Hospital[]>(
                await this.hospitalRepository.query(
                    `SELECT id_hospital FROM hospital WHERE name='${dataAppointment.hospital_name}'`,
                )
            );

            if (!findHospital || findHospital.length == 0) {
                throw new Error('cannot find hospital');
            }
            appointment.id_hospital = findHospital[0].id_hospital;

            // upload image
            const fileName = await this.uploadPicture(file);
            appointment.appointment_picture = fileName;

            const addAppointment = await this.appointmentRepository.save(appointment);
            return !addAppointment
                ? this.responseBadRequest('cannot add appointment')
                : this.responseOK({ id_appointment: addAppointment.id_appointment });
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async getAppointment(status: string): Promise<ResponseInterface> {
        try {
            // check role: staff

            // logic
            const dataAppointment = await this.appointmentRepository.findBy({
                status: status || 'prepare',
            });

            const arrAppointment = await Promise.all(
                dataAppointment.map(async (appointment) => {
                    const path = appointment.appointment_picture.split('/');
                    appointment.appointment_picture = await this.viewPicture(path[1], path[0]);
                    return appointment;
                }),
            );
            return this.responseOK(arrAppointment);
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async getPatient(staff): Promise<ResponseInterface> {
        try {
            const findStaff = await this.staffRepository.findOneBy({ id_card: staff.id_card });
            if (!findStaff) {
                return this.responseUnauthorized('staff only');
            }

            const dataAppointment = await this.appointmentRepository.find({});
            const convertAppointment = await Promise.all(
                dataAppointment.map(async (appointment) => {
                    const path = appointment.appointment_picture.split('/');
                    appointment.appointment_picture = await this.viewPicture(path[1], path[0]);
                    return appointment;
                }),
            );
            return this.responseOK(convertAppointment);
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async getHistory(user): Promise<ResponseInterface> {
        try {
            const findAppointment = await this.appointmentRepository.findOneBy({ id_card: user.id_card });
            if (findAppointment) {
                return this.responseOK(findAppointment);
            }
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    // picture: upload
    private async uploadPicture(file) {
        try {
            const fileName = await this.upload(file);
            return fileName;
        } catch (err) {
            throw new Error('cannot upload image');
        }
    }

    private async upload(file, fileFolder = 'uploads', filePrefix = 'img') {
        const bucket = this.firebaseAdmin.storage().bucket();

        const fileName = `${fileFolder}/${filePrefix}_${Date.now()}`;
        const fileUpload = bucket.file(fileName);
        const blobSteam = fileUpload.createWriteStream({
            metadata: {
                contentType: file.mimetype,
            },
        });

        blobSteam.on('error', (err) => {
            console.log(err);
        });
        blobSteam.on('finish', (data) => {
            console.log('>> upload image completed');
        });

        blobSteam.end(file.buffer);
        return fileName;
    }

    // picture: get url
    private async viewPicture(fileName: string, fileFolder = 'uploads') {
        try {
            const file = await this.view(fileName, fileFolder);
            return file;
        } catch (err) {
            throw new Error('cannot get picture');
        }
    }

    private async view(fileName: string, fileFolder = 'uploads') {
        const bucket = this.firebaseAdmin.storage().bucket();

        const [file] = await bucket.file(`${fileFolder}/${fileName}`).getSignedUrl({
            version: 'v4',
            action: 'read',
            expires: Date.now() + 1000 * 60 * 60 * 24,
        });

        return file;
    }
}

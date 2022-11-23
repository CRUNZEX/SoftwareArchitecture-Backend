import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { StaffInterface } from '../interface/staff.interface';
import { AddStaffValidation } from '../validation/addStaff.validation';
import { validate } from '@nestjs/class-validator';
import { Staff } from '../database/staff.entity';

// import { ResponseInterface } from '../interface/response.interface';
import { ResponseInterface } from 'src/res/response.interface';
import { Repository } from 'typeorm';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private readonly staffRepository: Repository<Staff>,
    ) {}

    async addStaff(user, createStaff: StaffInterface): Promise<ResponseInterface> {
        const staff = new Staff();
        try {
            let validationStaff = new AddStaffValidation();
            Object.keys(createStaff).forEach((key) => {
                validationStaff[key] = createStaff[key];
            });

            let errStaff = await validate(validationStaff);

            if (errStaff.length > 0) {
                let errPayload = {};
                for (const err of errStaff) {
                    errPayload[err.property.toString()] = Object.values(err.constraints);
                }
                return {
                    statusCode: 400,
                    message: 'failed: validation error',
                    payload: errPayload,
                };
            }
            staff.id_card = user.id_card;
            staff.title_name = createStaff.title_name;
            staff.first_name = createStaff.first_name;
            staff.last_name = createStaff.last_name;
            staff.phone = createStaff.phone;
            staff.email = user.email;
            const findStaff = await this.staffRepository.find({
                where: [
                    { id_card: user.id_card },
                    { first_name: createStaff.first_name, last_name: createStaff.last_name },
                    { email: user.email },
                ],
            });

            if (findStaff.length == 0) {
                const newStaff = await this.staffRepository.save(staff);
                return {
                    statusCode: 200,
                    message: 'success',
                };
            } else {
                const { id_card, ...objStaff } = findStaff[0]
                let payload = {};
                Object.keys(objStaff).forEach((key) => {
                    payload[key] = findStaff[0][key] == createStaff[key];
                });
                return {
                    statusCode: 409,
                    message: 'failed: duplicate staff',
                    payload: payload,
                };
            }
        } catch (err) {
            return {
                statusCode: 400,
                message: `failed: ${err}`,
            };
        }
    }

    async getStaffIdCard(id_card: string): Promise<ResponseInterface> {
        try {
            const dataStaff = await this.staffRepository.findOneBy({ id_card: id_card });
            if (!dataStaff) {
                return {
                    statusCode: 400,
                    message: 'failed: staff not found',
                };
            }
            return {
                statusCode: 200,
                message: 'success',
                payload: dataStaff,
            };
        } catch (err) {
            return {
                statusCode: 400,
                message: `failed: ${err}`,
            };
        }
    }
}

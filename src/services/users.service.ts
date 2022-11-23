import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInterface } from '../interface/user.interface';
import { UserValidationInterface } from '../validation/user.interface';
import { AddUserValidation } from '../validation/addUser.validation';
import { UpdateUserValidation } from '../validation/updateUser.validation';

import { User } from '../database/user.entity';
import { validate } from '@nestjs/class-validator';

import { Registration } from '../database/registration.entity';

import { configUser } from 'src/config/user.config';

import { ResponseHandler } from 'src/res/response.config';
import { ResponseInterface } from 'src/res/response.interface';

@Injectable()
export class UsersService extends ResponseHandler {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Registration)
        private readonly registrationRepository: Repository<Registration>,
    ) {
        super();
    }

    async addUser(createUser): Promise<ResponseInterface> {
        const user = new User();

        try {
            // validation
            let validationUser = new AddUserValidation();

            Object.keys(createUser).forEach((key) => {
                validationUser[key] = createUser[key];
            });

            let errUser = await validate(validationUser);

            if (errUser.length > 0) {
                let errPayload = {};
                for (const err of errUser) {
                    errPayload[err.property.toString()] = Object.values(err.constraints);
                }

                return this.responseBadRequest('validation error', errPayload);
            }

            // create user object
            configUser.keys.forEach((key) => {
                user[key] = createUser[key];
            });

            // check duplicate user
            const findUser = await this.userRepository.find({
                where: [
                    { id_card: createUser.id_card },
                    { first_name: createUser.first_name, last_name: createUser.last_name },
                    { email: createUser.email },
                ],
            });

            // save user
            if (findUser.length == 0) {
                const newUser = await this.userRepository.save(user);
                return this.responseOK({ id_card: newUser.id_card });
            } else {
                let payload = {};
                Object.keys(findUser[0]).forEach((key) => {
                    payload[key] = findUser[0][key] == createUser[key];
                });
                return this.responseConflict('duplicate user');
            }
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async updateUser(user, payload): Promise<ResponseInterface> {
        try {
            const userFind = await this.userRepository.findOneBy({ id_card: user.id_card });
            if (!userFind) {
                return this.responseBadRequest('user not found');
            }

            const userProfileFind = await this.registrationRepository.findOneBy({
                id_card: user.id_card,
            });

            // validate
            // let validationUser = new UserValidation()
            // Object.keys(updateUser).forEach((key) => {
            //     if (!['idCard', 'email'].includes(key))
            //         validationUser[key] = updateUser[key];
            //     else
            //         validationUser[key] = dataUser[key];
            // })
            // let errUser = await validate(validationUser)

            // if (errUser.length > 0) {
            //     let errPayload = {}
            //     for (const err of errUser) {
            //         errPayload[err.property.toString()] = Object.values(err.constraints)
            //     }

            //     return {
            //         statusCode: 400,
            //         message: 'failed: validation error',
            //         payload: errPayload
            //     }

            // }

            // update
            Object.keys(payload).forEach((key) => {
                userFind[key] = payload[key];
                userProfileFind[key] = payload[key];
            });

            const userUpdate = await this.userRepository.save(userFind);
            const userProfileUpdate = await this.registrationRepository.save(userProfileFind);
            return this.responseOK();
        } catch (err) {
            return this.responseUnauthorized(err.message);
        }
    }

    async getUserById(user): Promise<ResponseInterface> {
        try {
            const userFind = await this.userRepository.findOneBy({ id_card: user.id_card });

            if (!userFind) {
                return this.responseBadRequest('user not found');
            }
            return this.responseOK(userFind);
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }
}

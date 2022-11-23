import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Registration } from '../database/registration.entity';
import { RegistrationInterface } from '../interface/registration.interface';
import { ResponseInterface } from '../interface/response.interface';

import { User } from '../database/user.entity';

import { ResponseHandler } from 'src/res/response.config';
import { configRegistration } from 'src/config/registration.config';
import { configUser } from 'src/config/user.config';

@Injectable()
export class RegisterService extends ResponseHandler {
    constructor(
        @InjectRepository(Registration)
        private readonly registrationRepository: Repository<Registration>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super();
    }

    async registration(user, payload): Promise<ResponseInterface> {
        const registration = new Registration();
        try {
            // validation

            // logic
            configRegistration.keys.forEach((key) => {
                registration[key] = payload[key];
            });
            registration.id_card = user.id_card;
            const profile = await this.registrationRepository.save(registration);
            const userAdd = await this.userRepository.save({
                id_card: user.id_card,
                email: user.email,
                title_name: payload.title_name,
                first_name: payload.first_name,
                last_name: payload.last_name,
                phone: payload.phone,
                birthday: payload.birthday,
            });
            return this.responseOK();
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async getProfile(user): Promise<ResponseInterface> {
        try {
            const profileFind = await this.registrationRepository.findOneBy({
                id_card: user.id_card,
            });
            if (!profileFind) {
                throw new Error('cannnot find profile from this id_card');
            }
            return this.responseOK(profileFind);
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }
}

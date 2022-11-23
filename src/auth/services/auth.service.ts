import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from '@nestjs/class-validator';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import sha256 from 'fast-sha256';

import { PayloadRequestInterface } from '../interface/payloadRequest.interface';
import { Auth } from '../auth.entity';
import { RegisterValidation } from '../validation/register.validation';
import { LoginValidation } from '../validation/login.validation';

import { ResponseHandler } from 'src/res/response.config';
import { ResponseInterface } from 'src/res/response.interface';

@Injectable()
export class AuthService extends ResponseHandler {
    constructor(
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>,
    ) {
        super();
    }

    async register(payload: PayloadRequestInterface): Promise<ResponseInterface> {
        try {
            const { email, password, id_card } = payload;

            // validation
            let validationUser = new RegisterValidation();
            Object.keys(payload).forEach((key) => {
                validationUser[key] = payload[key];
            });
            let errUser = await validate(validationUser);

            if (errUser.length > 0) {
                let errPayload = {};
                for (const err of errUser) {
                    errPayload[err.property.toString()] = Object.values(err.constraints);
                }
                return this.responseBadRequest('validation error', errPayload);
            }

            // user: check duplicate
            const userDuplicate = await this.authRepository.findOneBy({ email });
            if (userDuplicate) {
                return this.responseConflict();
            }

            // register
            const passwordEncrypted = await bcrypt.hash(sha256(password).toString(), 10);
            const token = this.jwtSign(payload);
            const userPayload = {
                email,
                id_card,
                password: passwordEncrypted,
                token,
            };

            // save to database
            const userSave = await this.authRepository.save(userPayload);
            return this.responseOK({ token });
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    async login(payload: PayloadRequestInterface): Promise<ResponseInterface> {
        try {
            const { email, password } = payload;

            // validation
            let validationUser = new LoginValidation();
            Object.keys(payload).forEach((key) => {
                validationUser[key] = payload[key];
            });
            let errUser = await validate(validationUser);
    
            if (errUser.length > 0) {
                let errPayload = {};
                for (const err of errUser) {
                    errPayload[err.property.toString()] = Object.values(err.constraints);
                }
    
                return this.responseBadRequest('validation error', errPayload);
            }
    
            // password check
            const userFind = await this.authRepository.findOneBy({ email });
            const passwordCompare = await bcrypt.compare(String(sha256(password)), userFind.password);
    
            // update token
            if (userFind && passwordCompare) {
                const tokenLogin = this.jwtSign(payload);
                const { token, ...userFindPayload } = userFind;
                const userPayload = {
                    token: tokenLogin,
                    ...userFindPayload,
                };
                const userSave = await this.authRepository.save(userPayload);
                return this.responseOK({ token: tokenLogin });
            }
            return this.responseUnauthorized();
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    private jwtSign(payload: PayloadRequestInterface) {
        const { email, id_card } = payload;
        return jwt.sign({ email, id_card }, process.env.JWT_SECERT, { expiresIn: '1d' });
    }
}

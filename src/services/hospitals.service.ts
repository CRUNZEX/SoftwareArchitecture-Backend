import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';

import { ResponseHandler } from 'src/res/response.config';
import { ResponseInterface } from 'src/res/response.interface';

import { configHospital } from 'src/config/hospital.config';
import { Hospital } from '../database/hospital.entity';
import { ServiceInterface } from 'src/interface/service.interface';

// type for import CSV to Database
type HospitalType = {
    id_hospital: string;
    name: string;
    phone: string;
    latitude: string;
    longitude: string;
    zipcode: string;
    province: string;
    district: string;
    subdistrict: string;
};

@Injectable()
export class HospitalService extends ResponseHandler {
    constructor(
        @InjectRepository(Hospital)
        private readonly hospitalRepository: Repository<Hospital>,
    ) {
        super();
    }

    // add data from CSV to Database
    async updateHospitalList(): Promise<ResponseInterface> {
        try {
            const csvFilePath = path.resolve(__dirname + '../../../src/data/hospital.csv');
            const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    
            const promise = new Promise <HospitalType[]> ((resolve, reject) => {
                try {
                    parse(
                        fileContent,
                        {
                            delimiter: ',',
                            columns: configHospital.headers,
                        },
                        (err, result: HospitalType[]) => {
                            if (err) {
                                console.error(`>> error: ${err}`);
                            }
                            resolve(result);
                        },
                    );
                } catch (err) {
                    reject(err);
                }
            });
            promise.then(async (result: HospitalType[]) => {
                const arrHospital = await Promise.all(
                    result.map(async (hospital: HospitalType) => {
                        try {
                            if (!Object.values(hospital).includes('id_hospital')) {
                                const data = await this.hospitalRepository.save(hospital);
                                return data;
                            }
                        } catch (err) {
                            console.log(`>> failed: cannot add hospital database ${err.message}`)
                            return err.message
                        }
                    })
                )
    
                return arrHospital
            });
            promise.catch((err) => {
                console.log(`>> failed: cannot add hospital database ${err}`)
            })
    
            return this.responseOK();
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    // get all hospital list
    async getHospitalList(): Promise<ResponseInterface> {
        try {
            const data = await this.hospitalRepository.find({});
            return this.responseOK(data);
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }

    // get hospital list from search keyword
    async getHospitalSearch(keyword: string): Promise<ResponseInterface> {
        try {
            const data = await this.hospitalRepository.find({});
            const arrHospital = await Promise.all(
                data
                    .filter((element) => element.name.includes(keyword))
                    .map((element) => element.name),
            );

            return this.responseOK(arrHospital);
        } catch (err) {
            return this.responseBadRequest(err.message);
        }
    }
}

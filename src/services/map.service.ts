import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponseHandler, ResponseInterface } from '../res';

import { Hospital } from 'src/database/hospital.entity';

type HospitalType = {
    distance: number;
    id_hospital: string;
    name: string;
    phone: string;
    latitude: string;
    longitude: string;
    zipcode: string;
    province: string;
    district: string;
    subdistrict: string;
}

@Injectable()
export class MapService extends ResponseHandler {
    constructor(
        @InjectRepository(Hospital)
        private readonly hospitalRepository: Repository<Hospital>,
    ) { 
        super();
    }

    async calculationPosition(position: { lat: string; log: string; }): Promise<ResponseInterface> {
        try {
            const latPos = parseFloat(position.lat)
            const logPos = parseFloat(position.log)
    
            const arrHospital = await this.hospitalRepository.find({})
            const distanceHospital = <HospitalType[]> await Promise.all(
                arrHospital.map((hospital: Hospital) => {
                    const latHospitalPos = parseFloat(hospital.latitude)
                    const logHospitalPos = parseFloat(hospital.longitude)
    
                    return {
                        ...hospital,
                        distance: (((latPos - latHospitalPos) ** 2) + ((logPos - logHospitalPos) ** 2)) ** 0.5
                    }
                })
            )

            const convertHospital = distanceHospital
                .sort((obj1: HospitalType, obj2: HospitalType): number => {
                    if (obj1.distance < obj2.distance)
                        return -1
                    if (obj1.distance > obj2.distance)
                        return 1
                    return 0
                })
                .slice(0, 10)
            
            return this.responseOK(convertHospital)
        } catch (err) {
            return this.responseBadRequest(err.message)
        }
    }
}
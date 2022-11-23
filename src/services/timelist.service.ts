import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { configQueue } from '../config/queue.config';

import { ResponseHandler, ResponseInterface } from '../res';

@Injectable()
export class TimelistService extends ResponseHandler {
    async getTimelist(): Promise<ResponseInterface> {
        return this.responseOK(configQueue.timeList)
    }
}
import { Body, Controller, Get, Res, HttpStatus, Req } from '@nestjs/common';
import { Request, Response } from "express";
import { ResponseInterface } from './response.interface';

export interface ServiceInterface {
    getRoute(): ResponseInterface;
}
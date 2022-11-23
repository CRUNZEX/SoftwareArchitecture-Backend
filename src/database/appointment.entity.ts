import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { common } from 'src/config/common';

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id_appointment: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    id_card: string;

    @Column({
        default: common.dateNow(),
        type: Date,
    })
    datetime: Date;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    id_hospital: string;

    @Column({
        nullable: false,
        default: '-',
        type: String,
    })
    appointment_picture: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    appointment_time: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    appointment_date: string;

    @Column({
        nullable: false,
        default: 'prepare',
        type: String,
    })
    status: string;
}

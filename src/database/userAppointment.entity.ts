import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { common } from 'src/config/common';

@Entity()
export class UserAppointment {
    @PrimaryGeneratedColumn()
    id_user_appointment: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    id_card: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    id_hospital: string;

    @Column({
        nullable: false,
        default: common.dateNow(),
        type: Date,
    })
    datetime: Date;

    @Column({
        // nullable: false,
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
        default: '',
        type: String,
    })
    illness: string;

    @Column({
        // nullable: false,
        default: '',
        type: String,
    })
    illness_note: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    illness_duration: string;

    @Column({
        nullable: false,
        default: 'prepare',
        type: String,
    })
    status: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    appointment_type: string;
}

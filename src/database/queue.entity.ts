import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { common } from 'src/config/common';

@Entity()
export class Queue {
    @PrimaryGeneratedColumn()
    id_q: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    id_appointment: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    id_staff: string;

    @Column({
        nullable: false,
        default: common.dateNow(),
        type: Date,
    })
    datetime: Date;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    q_time: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    q_date: string;

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

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    department: string;

    @Column({
        default: '-',
        type: String,
    })
    note: string;
}

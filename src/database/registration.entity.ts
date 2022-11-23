import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

import { common } from 'src/config/common';

@Entity()
export class Registration {
    @PrimaryColumn({
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
    title_name: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    first_name: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    last_name: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    phone: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    gender: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    nationality: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    country: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    province: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    religion: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    marital_status: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    blood_group: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    occupation: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    mother_title_name: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    mother_first_name: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    mother_last_name: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    father_title_name: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    father_first_name: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    father_last_name: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    allergy: string;

    @Column({
        default: common.dateNow(),
        type: Date,
    })
    datetime: Date;

    @Column({
        nullable: false,
        default: common.dateNow(),
        type: Date,
    })
    birthday: Date;
}

import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Hospital {
    @PrimaryColumn({
        nullable: false,
        default: '',
        type: String,
    })
    id_hospital: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    name: string;

    @Column({
        // nullable: false,
        default: '',
        type: String,
    })
    phone: string;

    @Column({
        // nullable: false,
        default: '',
        type: String,
    })
    latitude: string;

    @Column({
        // nullable: false,
        default: '',
        type: String,
    })
    longitude: string;

    @Column({
        // nullable: false,
        default: '',
        type: String,
    })
    zipcode: string;

    @Column({
        // nullable: false,
        default: '',
        type: String,
    })
    province: string;

    @Column({
        // nullable: false,
        default: '',
        type: String,
    })
    district: string;

    @Column({
        // nullable: false,
        default: '',
        type: String,
    })
    subdistrict: string;
}

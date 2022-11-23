import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Staff {
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
    email: string;
}

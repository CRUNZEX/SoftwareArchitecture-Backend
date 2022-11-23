import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Auth {
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
    email: string;

    @Column({
        nullable: false,
        default: '',
        type: String,
    })
    password: string;

    @Column({
        default: '',
    })
    token: string;
}

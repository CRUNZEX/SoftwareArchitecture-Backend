import { IsEmail, Length, Matches } from '@nestjs/class-validator';

export class RegisterValidation {
    @IsEmail()
    email: string;

    @Length(8, 64, {
        message: 'password must be lenght between 8 - 64 characters',
    })
    password: string;

    @Length(13, 13, {
        message: 'lenght of idCard must be equal 13',
    })
    @Matches(/^[0-9]{13}$/, {
        message: 'idCard must be numeric',
    })
    id_card: string;
}

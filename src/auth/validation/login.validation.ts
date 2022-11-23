import { IsEmail, Length, Matches } from '@nestjs/class-validator';

export class LoginValidation {
    @IsEmail()
    email: string;

    @Length(8, 64, {
        message: 'password must be lenght between 8 - 64 characters',
    })
    password: string;
}

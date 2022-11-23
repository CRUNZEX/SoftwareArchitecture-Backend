import {
    validate,
    validateOrReject,
    ValidateIf,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Matches,
    Min,
    Max,
    IsDateString,
} from '@nestjs/class-validator';

export class UpdateUserValidation {
    @Length(1, 16, {
        message: 'titleName is too long',
    })
    title_name: string;

    @Length(1, 64, {
        message: 'firstName is too long',
    })
    first_name: string;

    @Length(1, 64, {
        message: 'lastName is too long',
    })
    last_name: string;

    @Length(9, 10, {
        message: 'lenght of phone must be between 9-10 charecter',
    })
    @Matches(/^(0)[689]{1}[0-9]{8}$/, {
        message: 'phone must be numeric',
    })
    phone: string;

    @IsDateString()
    birthday: Date;
}

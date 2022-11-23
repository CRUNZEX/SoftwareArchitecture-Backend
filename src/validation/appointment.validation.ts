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

export class AppointmentValidation {
    @Length(13, 13, {
        message: 'lenght of idCard must be equal 13',
    })
    @Matches(/^[0-9]{13}$/, {
        message: 'idCard must be numeric',
    })
    id_card: string;

    @IsDateString()
    datetime: Date;
}

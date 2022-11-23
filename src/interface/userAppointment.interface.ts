export interface userAppointmentInterface {
    id_user_appointment: string;
    id_hospital: string;
    id_card: string;
    datetime: Date;
    appointment_time: string;
    appointment_date: string;
    illness: string;
    illness_note: string;
    illness_duration: string;
    appointment_type: string;
}

export interface updateAppointmentInterface {
    id_user_appointment: string;
    id_hospital: string;
    appointment_time: string;
    appointment_date: string;
}

export interface QueueInterface {
    id_q: string;
    id_appointment: string;
    id_staff: string;
    datetime: Date;
    q_time: string;
    q_date: string;
    status: string;
    appointment_type: string;
    department: string;
    note: string;
}

export interface DeQueueInterface {
    id_q: string;
}

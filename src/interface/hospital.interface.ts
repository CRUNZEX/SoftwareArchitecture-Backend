export class HospitalInterface {
    id_hospital: string;
    name: string;
    phone: string;
    latitude: string;
    longitude: string;
    address?: {
        zipcode: string;
        province: string;
        district: string;
        subdistrict: string;
    };
}
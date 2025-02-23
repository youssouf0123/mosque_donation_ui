import { Customer } from "./customer.interface";

export interface Vehicule
{
    id: number;
    licensePlate: string;
    make: string;
    model: string;
    vin: string;
    bodyType: string;
    custId: number;
    custFirstName: string;
    custLastName: string;
    showedSaveOrUpdate: string;
}


// import { EnumType } from "typescript";

import { Vehicule } from "./vehicule.interface";

export interface Customer
{
    id: number;
    firstName: string;
    lastName: string;
    phoneNum: string;
    emailAddress: string;
    licensePlate: string ;
    make: string ;
    model: string;
    vin: string ;
    bodyType: string;
    showedSaveOrUpdate: string;
    showedAddVehicule: boolean;
}


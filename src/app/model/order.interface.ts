import { Return } from "./return.interface";

export interface Order {
    id: number;
    customerFirstName: string;
    customerLastName: string;
    customerPhoneNumber: number;
    customerAddress: string;
    customerCity: string;
    customerCountry: string;
    amount: number;
    invoiceDOCX: ArrayBuffer;
    invoicePDF: ArrayBuffer;
    orderDate: string;
    status: string;
    returns: Array<Return>;
}
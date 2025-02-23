import { Order } from "./order.interface";

export interface Return {
    id: number;
    amount: number;
    order: Order;
    returnDate: string;
    returnDOCX: ArrayBuffer;
    returnPDF: ArrayBuffer;
}
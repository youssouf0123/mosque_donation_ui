export interface Order {
    orderId: number;
    customerFirstName: string;
    customerLastName: string;
    customerPhoneNum: number;
    customerAddress: string;
    customerCity: string;
    customerCountry: string;
    amount: number;
    invoiceDOCX: ArrayBuffer;
    invoicePDF: ArrayBuffer;
    orderDate: string;
    status: string;
}
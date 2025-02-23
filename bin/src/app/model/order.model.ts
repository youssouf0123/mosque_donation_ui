export class Order {

	//	id: number;
	customerFirstName: string;
	customerLastName: string;
	customerAddress: string;
	
//	customerCity: string;
//	customerCountry: string;
	
	customerPhoneNumber: string;
	cart: any;

	constructor(data: any) {

		this.customerFirstName = data.customer.firstName;
		this.customerLastName = data.customer.lastName;
		this.customerAddress = data.customer.address;
		this.customerPhoneNumber = data.customer.phone;

		this.cart = data.cart;
	}

}
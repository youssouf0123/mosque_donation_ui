export class Order {

	id: number;
	firstName: string;
	lastName: string;
	address: string;

	//	city: string;
	//	country: string;

	phone: string;
	cart: any;

	constructor(data: any) {
		
		this.id = data.customer.id;
		this.firstName = data.customer.firstName;
		this.lastName = data.customer.lastName;
		this.address = data.customer.address;
		this.phone = data.customer.phone;

		this.cart = data.cart;
	}

}
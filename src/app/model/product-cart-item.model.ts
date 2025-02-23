import { CartItem } from 'ng-shopping-cart';

//https://devconcept.github.io/ng-shopping-cart/guide/the-cart-item#using-other-classes

export class ProductCartItem extends CartItem {

	public id: number;
	public name: string;
	public price: number;
	public image: string;
	public quantity: number;

	constructor(itemData: any) {
		super();
		this.id = itemData.id || 0;
		this.name = itemData.name || '';
		this.price = itemData.price || 0;
		this.image = itemData.image || '';
		this.quantity = itemData.quantity || 1;

	}

	// An unique identifier for each item.
	public getId(): any {
		//return this.uuid;
		return this.id;
	}

	// Short descriptive text for the item.
	public getName(): string {
		return this.name;
	}

	// How much a single unit cost.
	public getPrice(): number {
		return this.price;
	}

	// An optional url with an image of your item.
	public getImage(): string {
		return "assets/images/" + this.id + ".jpg";
	}

	// How much of this item is ordered.
	public getQuantity(): number {
		return this.quantity;
	}

	// Sets how much of this item is ordered.
	public setQuantity(quantity: number): void {
		this.quantity = quantity;
	}

}
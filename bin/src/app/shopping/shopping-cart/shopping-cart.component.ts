import { Component, OnInit } from '@angular/core';

import { ProductCartItem } from '../../model/product-cart-item.model';
import { environment } from '../../../environments/environment';
import { CartService } from 'ng-shopping-cart';

//https://devconcept.github.io/ng-shopping-cart/api/components/cart-checkout-component

import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-shopping-cart',
	templateUrl: './shopping-cart.component.html',
	styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

	env = environment;

	constructor(public http: HttpClient, private _cartService: CartService<ProductCartItem>) {}

	ngOnInit() {
		//		this._cartService.setTaxRate(this.env.taxRate);
		//		console.log(this._cartService.getItems());
	}

	checkout(): void {
		alert("You have successfully checked out!");
	}
}
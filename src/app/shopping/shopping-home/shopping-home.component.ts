import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http'
import { CheckoutHttpSettings } from 'ng-shopping-cart'

import { OrderService } from "../../services/order.service"
import { first } from 'rxjs/operators';
import { CartService } from 'ng-shopping-cart';
import { ProductCartItem } from '../../model/product-cart-item.model';

@Component({
	selector: 'app-shopping-home',
	templateUrl: './shopping-home.component.html',
	styleUrls: ['./shopping-home.component.css']
})
export class ShoppingHomeComponent implements OnInit {

    orderId: number;
	isAddMode: boolean;
	loading = false;
	submitted = false;

	userForm: FormGroup;

	httpSettings: CheckoutHttpSettings = {
		//		"url": 'http://myapi.com/',
		"url": 'http://localhost:8081/autoshop/orders/add',
		"method": 'POST',
		"options": {
			headers: new HttpHeaders({
				//				'Content-Type': 'application/json'
				"Authorization": 'Bearer my-auth-token'

			})
		}
	};

	constructor(
		public formBuilder: FormBuilder, 
		private orderService: OrderService,
		private _cartService: CartService<ProductCartItem>,
		private _router: Router
	) { }

	ngOnInit(): void {
		
		this.orderId = history.state.id;
		this.isAddMode = !this.orderId;
		        
		this.userForm = this.formBuilder.group({
			id: [''],			
			firstName: ['', [Validators.required, Validators.minLength(4)]],
			lastName: ['', [Validators.required, Validators.minLength(4)]],
			address: [''],
			phone: ['', [Validators.required]]
		});

		if (!this.isAddMode) {
			this._cartService.clear();
			this.orderService.findOrderByIdForEdit(this.orderId, "PENDING")
				.pipe(first())
				.subscribe(x => {
//					console.debug(x);
					x.cart.items.forEach((entry) => {
						const productCartItem: ProductCartItem = new ProductCartItem(entry);
						this._cartService.addItem(productCartItem);
					});
					this.userForm.patchValue(x);
				});
		}

	}

	get getControl() {
		return this.userForm.controls;
	}

	onSubmit() {
		console.debug(this.userForm);
	}
	
	cancel() {
		console.debug('cancelling!');
		this._cartService.clear();
		this._router.navigateByUrl('/pending-orders');		
	}

	//	//	constructor() { }
	//	constructor(private router: Router, private activatedRoute: ActivatedRoute) {
	//		
	////		console.debug(this.router.getCurrentNavigation().extras.state);
	//
	//	}
	//
	//	ngOnInit(): void {
	//		console.debug(history.state);
	//	}

}
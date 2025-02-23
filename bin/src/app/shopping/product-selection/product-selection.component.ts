import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from 'ng-shopping-cart';
import { ProductCartItem } from '../../model/product-cart-item.model';
import { ProductService } from '../../services/product.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../../model/product.interface';

@Component({
	selector: 'app-product-selection',
	templateUrl: './product-selection.component.html',
	styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent implements OnInit {

	isSubmitted = false;
	userForm: FormGroup;
	public products: Product[] = [];
	numbers: number[] = [];
	public dropDownValues = [];

	constructor(
		public formBuilder: FormBuilder,
		private _productService: ProductService,
		private _cartService: CartService<ProductCartItem>,
		private _router: Router
	) { }


	ngOnInit(): void {
		this.userForm = this.formBuilder.group({
			product: ['', [Validators.required]],
			quantity: ['', [Validators.required]]
		})

		this.numbers = Array(1000).fill(0).map((x, i) => i + 1);

		this.getProducts();

		this._cartService.setTaxRate(5);

		//		this._cartService.onItemAdded.subscribe(addedItem => {
		////			console.log(addedItem);
		//			this._router.navigate(['/', 'cart']);
		//		});

		this.dropDownValues = [
			{ label: 'One item', value: 1 },
			{ label: 'Two items', value: 2 }
		];
		this.dropDownValues = this.initQuantityDropdownValues(31);
	}

	get getControl() {
		return this.userForm.controls;
	}

	onSubmit() {

		//		console.log(this.userForm);

		this.isSubmitted = true;

		if (!this.userForm.valid) {
			console.debug('form is invalid!');
			false;
		} else {
			console.debug('form is valid!');

			const prdct: ProductCartItem = this.userForm.value["product"];
			const productCartItem: ProductCartItem = new ProductCartItem(prdct);
			const quantity: number = this.userForm.value["quantity"];

			//			console.log(prdct);

			productCartItem.setQuantity(quantity);

			//			console.log(prdct);

			this._cartService.addItem(productCartItem);
			this.userForm.reset();
			//			console.log(this.userForm.value);
			//			console.log(JSON.stringify(this.userForm.value));
		}

	}

	getProducts() {
		this._productService.getProducts().subscribe(data => {
			for (const entry of (data)) {
				this.products.push(entry);
			}
		});
	}

	private initQuantityDropdownValues(n) {
		const arr = Array.apply(null, Array(n));
		return arr.map(function(x, i) { return { "label": i, "value": i } });
	}

}
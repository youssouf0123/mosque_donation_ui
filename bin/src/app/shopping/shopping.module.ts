import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingRoutingModule } from './shopping-routing.module';
import { ShoppingCartModule } from 'ng-shopping-cart';
import { ReactiveFormsModule } from '@angular/forms';

import { ShoppingHomeComponent } from './shopping-home/shopping-home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CustomAddToCartComponent } from './custom-add-to-cart/custom-add-to-cart.component';
import { ProductSelectionComponent } from './product-selection/product-selection.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { CustomCartCheckoutComponent } from './custom-cart-checkout/custom-cart-checkout.component';

@NgModule({
	declarations: [
		ShoppingHomeComponent,
		ShoppingCartComponent,
		CustomAddToCartComponent,
		ProductSelectionComponent,
		CustomerInfoComponent,
		CustomCartCheckoutComponent
	],
	imports: [
		ShoppingCartModule,
		CommonModule,
		ShoppingRoutingModule,
		ReactiveFormsModule
	],
	exports: [ShoppingHomeComponent, ShoppingCartComponent, CustomAddToCartComponent, CustomCartCheckoutComponent]
})
export class ShoppingModule { }
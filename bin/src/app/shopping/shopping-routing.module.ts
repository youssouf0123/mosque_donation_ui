import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingHomeComponent } from './shopping-home/shopping-home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'shopping-home',
				component: ShoppingHomeComponent
			},
			{
				path: 'cart',
				component: ShoppingCartComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ShoppingRoutingModule { }

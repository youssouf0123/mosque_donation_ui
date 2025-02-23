// import { Component, OnInit } from '@angular/core';
// import { ShoppingCartService } from './../../service/shoppingcart.service';
// import { CartService } from 'ng-shopping-cart';
// import { Product } from 'src/app/model/product.model';
// import { environment } from 'src/environments/environment';

// @Component({
//   selector: 'app-shoppingcart',
//   templateUrl: './shoppingcart.component.html',
//   styleUrls: ['./shoppingcart.component.css']
// })
// export class ShoppingcartComponent implements OnInit {

//   env = environment;

//   constructor(private _cartService: CartService<Product>) { }

//   ngOnInit() {
//     this._cartService.setTaxRate(this.env.taxRate);
//   }

//   checkout(): void {
//     alert("You have successfully checked out!");
//   }

// }
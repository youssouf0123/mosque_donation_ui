import { Component } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductService } from './../../service/product.service';
import { ShoppingCartService } from './../../service/shoppingcart.service';
import { CartService, CartItem } from 'ng-shopping-cart';
import { Product } from 'src/app/model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public products: any = [];
  public dropDownValues = [];

  constructor(
    private _productService: ProductService,
    private _cartService: CartService<Product>,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getProducts();
    this._cartService.setTaxRate(5);
    this._cartService.onItemAdded.subscribe(addedItem => {
      console.log(addedItem);
      this._router.navigate(['/', 'cart']);
    });

    this.dropDownValues = [
      { label: 'One item', value: 1 },
      { label: 'Two items', value: 2 }
    ];
    this.dropDownValues = this.initQuantityDropdownValues(31);
    // console.log(this.dropDownValues);
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      for (const entry of (data)) {
        this.products.push(new Product(entry));
      }
    });
  }

  private initQuantityDropdownValues(n) {
    const arr = Array.apply(null, Array(n));
    return arr.map(function (x, i) { return { "label": i, "value": i } });
  }
}
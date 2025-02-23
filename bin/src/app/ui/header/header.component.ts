import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './../../service/shoppingcart.service';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'ng-shopping-cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _cartService: CartService<Product>) { }

  ngOnInit() {

  }

}
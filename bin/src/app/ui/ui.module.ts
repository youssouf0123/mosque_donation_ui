import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './../app-routing.module';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';

import { ShoppingCartModule } from 'ng-shopping-cart';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ShoppingCartModule
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, HomeComponent, ShoppingcartComponent, NotfoundComponent],
  exports: [LayoutComponent]
})
export class UiModule { }
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DonationRoutingModule } from './donation-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    DonationRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class DonationModule { }
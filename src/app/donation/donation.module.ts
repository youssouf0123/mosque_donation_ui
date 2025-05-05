import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DonationRoutingModule } from './donation-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DonorComponent } from './donor/donor.component';
import { RecipientComponent } from './recipient/recipient.component';
import { RegisterDonationComponent } from './register-donation/register-donation.component';

import { DemoMaterialModule } from '../demo-material-module';

@NgModule({
  declarations: [
    HomeComponent,
    DonorComponent,
    RecipientComponent,
    RegisterDonationComponent
  ],
  imports: [
    DonationRoutingModule,

    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    DemoMaterialModule
  ]
})
export class DonationModule { }
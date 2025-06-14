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
import { AddDonationComponent } from './add-donation/add-donation.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

import { AddDialogComponent } from './recipient/dialogs/add/add.dialog.component';
import { EditDialogComponent } from './recipient/dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './recipient/dialogs/delete/delete.dialog.component';

import { ManageDonationServerSideComponent } from './manage-donation-server-side/manage-donation-server-side.component';

@NgModule({
  declarations: [
    HomeComponent,
    DonorComponent,
    RecipientComponent,
    RegisterDonationComponent,
    AddDonationComponent,
    ConfirmDeleteComponent,
    AddDialogComponent,
    EditDialogComponent,
    DeleteDialogComponent,
    ManageDonationServerSideComponent
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
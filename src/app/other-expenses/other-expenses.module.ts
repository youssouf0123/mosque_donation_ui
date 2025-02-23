import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';

import { OtherExpensesRoutingModule } from './other-expenses-routing.module';
import { ExpensesHomeComponent } from './expenses-home/expenses-home.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExpensesHomeComponent
  ],
  imports: [
    CommonModule,
    OtherExpensesRoutingModule,
    ReactiveFormsModule,
    DemoMaterialModule
  ]
})
export class OtherExpensesModule { }

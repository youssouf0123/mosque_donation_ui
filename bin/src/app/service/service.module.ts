import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { DemoMaterialModule } from '../demo-material-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ServiceItemsComponent } from './service-items/service-items.component';
import { DragableColumnDirective } from './dragable-column-directive/dragable-column.directive';
import { OrderInfoComponent } from './order-info/order-info.component';
import { OrderServiceInfoComponent } from './order-service-info/order-service-info.component';

import { ComponentHostDirective } from './customer/customer-info/component-host.directive';
import { InfoComponent } from './customer/customer-info/info.component';

@NgModule({
  declarations: [
    HomeComponent,
    CustomerComponent,
    AppointmentComponent,
    ServiceItemsComponent,
    DragableColumnDirective,
    OrderInfoComponent,
    OrderServiceInfoComponent,
    ComponentHostDirective,
    InfoComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule
  ]
})
export class ServiceModule { }
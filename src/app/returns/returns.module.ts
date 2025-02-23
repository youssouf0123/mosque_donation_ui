import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReturnsRoutingModule } from './returns-routing.module';

import { DemoMaterialModule } from '../demo-material-module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { DragableColumnDirective } from './dragable-column-directive/dragable-column.directive';
import { ReturnsHomeComponent } from './returns-home/returns-home.component';
import { ReturnsFormComponent } from './returns-form/returns-form.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@NgModule({
	declarations: [
		DragableColumnDirective,
		ReturnsHomeComponent,
		ReturnsFormComponent,
  		AlertDialogComponent
	],
	imports: [
		CommonModule,
		DemoMaterialModule,
		FormsModule,
		ReactiveFormsModule,
		NgxMatSelectSearchModule,
		ReturnsRoutingModule
	]
})
export class ReturnsModule { }
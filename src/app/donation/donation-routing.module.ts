import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../donation/home/home.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'donation-home',
				component: HomeComponent
			}
		]
	}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})

export class DonationRoutingModule { }
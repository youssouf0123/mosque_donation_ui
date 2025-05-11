import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../donation/home/home.component'
import { DonorComponent } from '../donation/donor/donor.component'
import { RecipientComponent } from './recipient/recipient.component';
import { RegisterDonationComponent } from './register-donation/register-donation.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'donation-home',
				component: HomeComponent
			},
			{
				path: 'donors',
				component: DonorComponent
			},
			{
				path: 'recipients',
				component: RecipientComponent
			},
			{
				path: 'register-donation',
				component: RegisterDonationComponent
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
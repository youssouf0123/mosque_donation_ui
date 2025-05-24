import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../donation/home/home.component'
import { DonorComponent } from '../donation/donor/donor.component'
import { RecipientComponent } from './recipient/recipient.component';
import { RegisterDonationComponent } from './register-donation/register-donation.component';
import { ManageDonationComponent } from './manage-donation/manage-donation.component';
import { DataService } from '../services/data.service';

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
				path: 'manage-donations',
				component: RegisterDonationComponent
			},
			{
				path: 'manage-donations-2',
				component: ManageDonationComponent
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
	exports: [RouterModule],
	providers: [DataService]
})

export class DonationRoutingModule { }
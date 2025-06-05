import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../donation/home/home.component'
import { DonorComponent } from '../donation/donor/donor.component'
import { RecipientComponent } from './recipient/recipient.component';
import { RegisterDonationComponent } from './register-donation/register-donation.component';
import { DataService } from '../services/data.service';
import { GithubService } from '../services/github.service';

import { NotificationService } from '../services/notification.service';
import { ManageDonationServerSideComponent } from './manage-donation-server-side/manage-donation-server-side.component';

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
				path: 'manage-donations-3',
				component: ManageDonationServerSideComponent
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
	providers: [DataService, NotificationService, GithubService]
})

export class DonationRoutingModule { }
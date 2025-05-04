import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
	{
		path: '',
		component: FullComponent,
		children: [
			{
				path: '',
				redirectTo: '/donation-home',
				pathMatch: 'full'
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			},
			{
				path: '',
				loadChildren:
					() => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
			},
			{
				path: '',
				loadChildren: () => import('./donation/donation.module').then(donation => donation.DonationModule)
			}
		]
	}
];
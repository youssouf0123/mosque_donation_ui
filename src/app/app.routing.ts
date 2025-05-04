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
			},




			{
				path: '',
				loadChildren: () => import('./shopping/shopping.module').then(shop => shop.ShoppingModule)
			},
			{
				path: '',
				loadChildren: () => import ('./returns/returns.module').then(r => r.ReturnsModule)
			},
			{
				path: '',
				loadChildren: () => import ('./other-expenses/other-expenses.module').then(o => o.OtherExpensesModule)
			}
		]
	}
];
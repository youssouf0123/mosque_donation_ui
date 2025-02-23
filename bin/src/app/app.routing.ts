import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [
	{
		path: '',
		component: FullComponent,
		children: [
			{
				path: '',
				redirectTo: '/dashboard',
				pathMatch: 'full'
			},
			{
				path: '',
				loadChildren:
					() => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
			},
			{
				path: '',
				loadChildren: () => import('./service/service.module').then(s => s.ServiceModule)
			},
			{
				path: '',
				loadChildren: () => import('./shopping/shopping.module').then(shop => shop.ShoppingModule)
			},
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
			}
		]
	}
];

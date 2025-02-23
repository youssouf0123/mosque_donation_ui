import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnsHomeComponent } from './returns-home/returns-home.component'

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'returns-home',
				component: ReturnsHomeComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReturnsRoutingModule { }
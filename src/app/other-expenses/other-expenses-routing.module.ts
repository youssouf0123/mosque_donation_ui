import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesHomeComponent } from './expenses-home/expenses-home.component';

const routes: Routes = [
  {
		path: '',
		children: [
			{
				path: 'expenses-home',
				component: ExpensesHomeComponent
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherExpensesRoutingModule { }
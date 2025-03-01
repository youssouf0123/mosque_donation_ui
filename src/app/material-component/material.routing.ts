import { Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component'; 
import { VehiculesComponent } from './vehicules/vehicules.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { ReturnsHistoryComponent } from './returns-history/returns-history.component'

export const MaterialRoutes: Routes = [
  {
    path: 'donator-list',
    component: ProductComponent
  },
  {
    path: 'orders-history',
    component: OrdersHistoryComponent
  },
  {
    path: 'donation-per-type',
    component: PendingOrdersComponent
  },
  {
    path: 'vehicules',
    component: VehiculesComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'stepper',
    component: StepperComponent
  },
  {
    path: 'expansion',
    component: ExpansionComponent
  },
  {
    path: 'chips',
    component: ChipsComponent
  },
  {
    path: 'toolbar',
    component: ToolbarComponent
  },
  {
    path: 'progress-snipper',
    component: ProgressSnipperComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'tooltip',
    component: TooltipComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'slide-toggle',
    component: SlideToggleComponent
  },
  {
	path: 'returns-history',
	component: ReturnsHistoryComponent
}
];

import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  // { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'shopping-home', name: 'Shopping', type: 'link', icon: 'av_timer' },
  { state: 'product', type: 'link', name: 'Product', icon: 'crop_7_5' },
  // { state: 'home', type: 'link', name: 'Service', icon: 'view_comfy' },
  // { state: 'vehicules', type: 'link', name: 'Vehicles', icon: 'view_list' },
  
  // { state: 'menu', type: 'link', name: 'Shopping', icon: 'view_comfy' },
  { state: 'pending-orders', type: 'link', name: 'Pending Orders', icon: 'crop_7_1' },
   { state: 'orders-history', type: 'link', name: 'Orders History', icon: 'crop_7_0' },
  { state: 'menu', type: 'link', name: 'Returns', icon: 'view_comfy' },
  { state: 'menu', type: 'link', name: 'Orders', icon: 'view_comfy' },
  { state: 'menu', type: 'link', name: 'Other Expenses', icon: 'view_comfy' },
  { state: 'menu', type: 'link', name: 'Order History', icon: 'view_comfy' },
  
  { state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline' },
  { state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab' },
  { state: 'stepper', type: 'link', name: 'Stepper', icon: 'web' },
  
  {
    state: 'expansion',
    type: 'link',
    name: 'Expansion Panel',
    icon: 'vertical_align_center'
  },
  { state: 'chips', type: 'link', name: 'Chips', icon: 'vignette' },
  { state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail' },
  {
    state: 'progress-snipper',
    type: 'link',
    name: 'Progress snipper',
    icon: 'border_horizontal'
  },
  {
    state: 'progress',
    type: 'link',
    name: 'Progress Bar',
    icon: 'blur_circular'
  },
  {
    state: 'dialog',
    type: 'link',
    name: 'Dialog',
    icon: 'assignment_turned_in'
  },
  { state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant' },
  { state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb' },
  { state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode' },
  {
    state: 'slide-toggle',
    type: 'link',
    name: 'Slide Toggle',
    icon: 'all_inclusive'
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}

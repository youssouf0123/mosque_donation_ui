import { Injectable } from '@angular/core';

export interface Menu {
	state: string;
	name: string;
	type: string;
	icon: string;
}

const MENUITEMS = [

	// icons: av_timer, crop_7_5, crop_7_1, crop_7_0, view_comfy, view_headline, tab, 
	// web, vertical_align_center, vignette, voicemail, border_horizontal, blur_circular, 
	// assignment_turned_in, assistant, adb, developer_mode, all_inclusive

	// { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },

	{ state: 'shopping-home', name: 'Shopping', type: 'link', icon: 'all_inclusive' },

	{ state: 'product', type: 'link', name: 'Product', icon: 'assistant' },

	// { state: 'vehicules', type: 'link', name: 'Vehicles', icon: 'view_list' },

	{ state: 'pending-orders', type: 'link', name: 'Pending Orders', icon: 'view_comfy' },

	{ state: 'orders-history', type: 'link', name: 'Order History', icon: 'assignment_turned_in' },

	{ state: 'returns-home', type: 'link', name: 'Returns', icon: 'vignette' },

	{ state: 'returns-history', type: 'link', name: 'Returns History', icon: 'blur_circular' },

	{ state: 'expenses-home', type: 'link', name: 'Other Expenses', icon: 'av_timer' }
];

@Injectable()
export class MenuItems {
	getMenuitem(): Menu[] {
		return MENUITEMS;
	}
}
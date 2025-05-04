import { Injectable } from '@angular/core';

export interface Menu {
	state: string;
	name: string;
	type: string;
	icon: string;
}

const MENUITEMS = [

	{ state: 'donation-home', name: 'Donations', type: 'link', icon: 'all_inclusive' },

	{ state: 'donator-list', type: 'link', name: 'Donors', icon: 'assistant' },

	{ state: 'donation-per-type', type: 'link', name: 'Donation By Type', icon: 'view_comfy' },

	{ state: 'orders-history', type: 'link', name: 'Recipients', icon: 'assignment_turned_in' },

	// { state: 'returns-home', type: 'link', name: 'Returns', icon: 'vignette' },

	// { state: 'returns-history', type: 'link', name: 'Returns History', icon: 'blur_circular' },

	// { state: 'expenses-home', type: 'link', name: 'Other Expenses', icon: 'av_timer' }
];

@Injectable()
export class MenuItems {
	getMenuitem(): Menu[] {
		return MENUITEMS;
	}
}
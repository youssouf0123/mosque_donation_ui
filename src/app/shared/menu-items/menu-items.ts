import { Injectable } from '@angular/core';

export interface Menu {
	state: string;
	name: string;
	type: string;
	icon: string;
}

const MENUITEMS = [
	{ state: 'donation-home', name: 'Donations', type: 'link', icon: 'all_inclusive' },

	{ state: 'donation-per-type', type: 'link', name: 'Donation By Type', icon: 'view_comfy' },

	{ state: 'donator-list', type: 'link', name: 'Donors', icon: 'assistant' },

	{ state: 'orders-history', type: 'link', name: 'Recipients', icon: 'assignment_turned_in' }
];

@Injectable()
export class MenuItems {
	getMenuitem(): Menu[] {
		return MENUITEMS;
	}
}
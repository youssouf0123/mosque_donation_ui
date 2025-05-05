import { Injectable } from '@angular/core';

export interface Menu {
	state: string;
	name: string;
	type: string;
	icon: string;
}

	// icons: av_timer, crop_7_5, crop_7_1, crop_7_0, view_comfy, view_headline, tab, 
	// web, vertical_align_center, vignette, voicemail, border_horizontal, blur_circular, 
	// assignment_turned_in, assistant, adb, developer_mode, all_inclusive
	
const MENUITEMS = [
	{ state: 'donation-home', name: 'Donations', type: 'link', icon: 'all_inclusive' },

	{ state: 'donation-per-type', type: 'link', name: 'Donation By Type', icon: 'view_comfy' },

	{ state: 'donors', type: 'link', name: 'Donors', icon: 'assistant' },

	{ state: 'recipients', type: 'link', name: 'Recipients', icon: 'blur_circular' }
];

@Injectable()
export class MenuItems {
	getMenuitem(): Menu[] {
		return MENUITEMS;
	}
}
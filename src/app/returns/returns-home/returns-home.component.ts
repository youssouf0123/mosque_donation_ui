import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
//import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-returns-home',
  templateUrl: './returns-home.component.html',
  styleUrls: ['./returns-home.component.css']
})
export class ReturnsHomeComponent implements OnInit {

//	links = ['First', 'Second', 'Third'];
//	activeLink = this.links[0];
//	background: ThemePalette = undefined;
//
//	toggleBackground() {
//		this.background = this.background ? undefined : 'primary';
//	}
//
//	addLink() {
//		this.links.push(`Link ${this.links.length + 1}`);
//	}

	public returnedItemsForm: FormGroup = new FormGroup({});

	constructor() { }

	ngOnInit(): void {
	}

	public onSubmit() {
		console.log("Customer Order Info", this.returnedItemsForm.value);
	}

}
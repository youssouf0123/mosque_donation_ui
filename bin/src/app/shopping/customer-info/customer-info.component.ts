import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http'
import { CheckoutHttpSettings } from 'ng-shopping-cart'

@Component({
	selector: 'app-customer-info',
	templateUrl: './customer-info.component.html',
	styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

	userForm: FormGroup;

	httpSettings: CheckoutHttpSettings = {
		//		"url": 'http://myapi.com/',
		"url": 'http://localhost:8081/autoshop/orders/add',
		"method": 'POST',
		"options": {
			headers: new HttpHeaders({
				//				'Content-Type': 'application/json'
				"Authorization": 'Bearer my-auth-token'
				
			})
		}
	};

	constructor(public formBuilder: FormBuilder) { }

	ngOnInit(): void {
		this.userForm = this.formBuilder.group({
			firstName: ['', [Validators.required, Validators.minLength(4)]],
			lastName: ['', [Validators.required, Validators.minLength(4)]],
			address: [''],
			phone: ['', [Validators.required]]
		})
	}

	get getControl() {
		return this.userForm.controls;
	}

	onSubmit() {
		console.debug(this.userForm);
	}

}
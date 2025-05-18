import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-donor',
	templateUrl: './donor.component.html',
	styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {

	// emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

	userForm: FormGroup;

	submitted = false;

	countries = [
		{ name: 'Mali', dialCode: '+223' },
		{ name: 'United States', dialCode: '+1' },
		{ name: 'United Kingdom', dialCode: '+44' }
		// Add more countries as needed
	];

	selectedCountryCode = '+223';
	phoneNumber = '';

	constructor(private fb: FormBuilder) { }

	ngOnInit() {
		this.userForm = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			selectedCountryCode: ['', Validators.required],
			phoneNumber: ['', Validators.required],
			email: ['', [Validators.email]]
		});
	}

	get f(): { [key: string]: AbstractControl } {
		return this.userForm.controls;
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.userForm.invalid) {
			return;
		}

		console.log(JSON.stringify(this.userForm.value, null, 2));
	}

	onReset(): void {
		this.submitted = false;
		this.userForm.reset();
	}
}
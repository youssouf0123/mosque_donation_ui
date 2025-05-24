import { Component, OnInit, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Donation } from 'src/app/model/donation.interface';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.css']
})
export class AddDonationComponent implements OnInit {

  donationTypes = [
    { value: 'Cooking Oil', viewValue: 'Cooking Oil' },
    { value: 'Sugar', viewValue: 'Sugar' },
    { value: 'Rice', viewValue: 'Rice' },
    { value: 'Meats', viewValue: 'Meats' },
    { value: 'Books', viewValue: 'Books' },
    { value: 'Toys', viewValue: 'Toys' },
    { value: 'Electronics', viewValue: 'Electronics' },
    { value: 'Furniture', viewValue: 'Furniture' },
    { value: 'Medical Supplies', viewValue: 'Medical Supplies' },
    { value: 'Shoes', viewValue: 'Shoes' },
    { value: 'Clothes', viewValue: 'Clothes' }
  ];

  constructor(
    public dialogRef: MatDialogRef<AddDonationComponent>,
    @Inject(MAT_DIALOG_DATA) public donation: Donation,
    @Inject(MAT_DIALOG_DATA) public data: { showedSaveOrUpdate: string },
    private fb: FormBuilder
  ) { }

  donationForm: FormGroup;

  // selectedCountryCode = '+223';
  // phoneNumber = '';

  submitted = false;

  // countries = [
  //   { name: 'Mali', dialCode: '+223' },
  //   { name: 'United States', dialCode: '+1' },
  //   { name: 'United Kingdom', dialCode: '+44' }
  //   // Add more countries as needed
  // ];

  ngOnInit() {
    this.donationForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      donation_type: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.donationForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.donationForm.invalid) {
      return;
    }

    console.log(JSON.stringify(this.donationForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.donationForm.reset();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
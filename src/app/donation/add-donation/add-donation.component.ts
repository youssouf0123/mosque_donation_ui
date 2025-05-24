import { Component, OnInit, Inject } from '@angular/core';
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
    @Inject(MAT_DIALOG_DATA) public data: { showedSaveOrUpdate: string }
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
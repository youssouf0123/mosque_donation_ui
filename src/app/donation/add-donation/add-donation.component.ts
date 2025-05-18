import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../model/product.interface';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.css']
})
export class AddDonationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddDonationComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    @Inject(MAT_DIALOG_DATA) public data: { showedSaveOrUpdate: string }
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
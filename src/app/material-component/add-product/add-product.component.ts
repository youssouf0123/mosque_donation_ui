import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Data } from '@angular/router';
import { Product } from '../../model/product.interface';
import { ProductComponent } from '../product/product.component';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
} )
  
export class AddProductComponent implements OnInit {
   
  constructor(
      public dialogRef: MatDialogRef<AddProductComponent>,
      @Inject(MAT_DIALOG_DATA) public product: Product, 
      @Inject(MAT_DIALOG_DATA) public data: {showedSaveOrUpdate: string}
    ) { }

  ngOnInit(): void {
  }

   onCancel(): void {
    this.dialogRef.close();
  }
  
}
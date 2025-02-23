import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/model/product.interface';
import { Vehicule } from 'src/app/model/vehicule.interface';

@Component({
  selector: 'app-add-vehicule',
  templateUrl: './add-vehicule.component.html',
  styleUrls: ['./add-vehicule.component.css']
})
export class AddVehiculeComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<AddVehiculeComponent>,
    @Inject(MAT_DIALOG_DATA) public vehicule: Vehicule) { }

  ngOnInit(): void {
  }

   onCancel(): void {
    this.dialogRef.close();
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-product',
  templateUrl: './confirm-delete-product.component.html',
  styleUrls: ['./confirm-delete-product.component.css']
})
export class ConfirmDeleteProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {deleteItemName: string}) { }

  ngOnInit(): void {
  }

}

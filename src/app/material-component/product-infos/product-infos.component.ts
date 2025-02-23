import { Component, OnInit, Inject } from "@angular/core"
import { NgForm } from "@angular/forms"
import {
	MatDialog,
	MatDialogRef,
	MAT_DIALOG_DATA,
} from "@angular/material/dialog"
import { Data } from "@angular/router"
import { Product } from "src/app/model/product.interface"
import { ProductComponent } from "../product/product.component"

@Component({
	selector: "app-product-infos",
	templateUrl: "./product-infos.component.html",
	styleUrls: ["./product-infos.component.css"],
})
export class ProductInfosComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<ProductInfosComponent>,
		@Inject(MAT_DIALOG_DATA) public product: Product,
	) {}

	ngOnInit(): void {}

	onOk(): void {
		this.dialogRef.close()
	}
}

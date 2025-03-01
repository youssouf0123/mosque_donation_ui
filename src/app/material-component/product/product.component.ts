import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { Product } from "../../model/product.interface"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { AddProductComponent } from "../add-product/add-product.component"
import { MatDialog } from "@angular/material/dialog"
import { ProductService } from "../../services/product.service"
import { HttpErrorResponse } from "@angular/common/http"
import { ConfirmDeleteProductComponent } from "../confirm-delete-product/confirm-delete-product.component"
import { AlertDialogComponent } from "../../returns/alert-dialog/alert-dialog.component"

@Component({
	selector: "app-product",
	templateUrl: "./product.component.html",
	styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements AfterViewInit, OnInit {
	
	displayedColumns: string[] = [
		"name",
		"phone",
		"type",
		"quantity",
		"delete",
		"update",
	]

	@ViewChild(MatPaginator) paginator!: MatPaginator

	@ViewChild(MatSort) prdTbSort = new MatSort()

	dataSource = new MatTableDataSource<Product>()

	public products: Product[] = this.dataSource.data

	name: string | undefined
	quantity: number = 0
	phone: string =""
	donation_type: string | undefined
	price: number = 0.0
	deleteItemName: string = "Product"

	constructor(
		public dialog: MatDialog,
		private productService: ProductService,
	) {}

	ngOnInit() {
		this.getProducts()
	}

	ngAfterViewInit() {
		// this.dataSource = new MatTableDataSource<Product>( this.products );
		this.dataSource.paginator = this.paginator
		this.dataSource.sort = this.prdTbSort
	}

	public getProducts(): void {
		this.productService.getProducts().subscribe(
			(response: Product[]) => {
				this.dataSource.data = response as Product[]
				console.log("Youssouf")
				console.log(this.dataSource.data)
			},
			(error: HttpErrorResponse) => {
				alert(error.message)
			},
		)
	}

	openDialog(msg: string): void {
		let dialogRef = this.dialog.open(AlertDialogComponent, {
			width: "250px",
			data: { message: msg },
		})
	}

	filterProductTable(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase()
	}

	addProduct() {

		const dialogRef = this.dialog.open(AddProductComponent, {
			width: "800px",
			data: {
				showedSaveOrUpdate: "Donate",
				name: this.name,
				phone: this.phone,
				donation_type: this.donation_type,
				quantity: this.quantity
			},
		});

		dialogRef.afterClosed().subscribe((result: Product) => {

			if (result == undefined) {
				console.debug("You cannot add null object on table")
				this.name = ""
				this.phone = ""
				this.donation_type = ""
				this.quantity = 0
				return
			}

			this.productService.addProduct(result).subscribe(
				(response: Product) => {

					console.debug(response)
					
					if (response.id === null) {
						this.openDialog(response.name + " already exists in products list.")
						return
					}

					// this.products.push( response );
					this.getProducts()
				},
				(error: HttpErrorResponse) => {
					alert(error.message)
				}
			);
		});
	}

	removeSelectedRows(id: number) {
		this.dialog
			.open(ConfirmDeleteProductComponent, {
				data: {
					deleteItemName: this.deleteItemName,
				},
			})

			.afterClosed()
			.subscribe((confirm) => {
				if (confirm) {
					this.productService.deleteProduct(id).subscribe(() => {
						this.dataSource.data = this.dataSource.data.filter(
							(p: Product) => p.id != id,
						)
					})
				}
			})
	}

	editProduct(id: number) {
		this.productService.getProductById(id).subscribe(
			(editSelectedProduct) => {
				this.name = editSelectedProduct.name
				this.quantity = editSelectedProduct.quantity
				// this.price = editSelectedProduct.price

				const dialogRef = this.dialog.open(AddProductComponent, {
					width: "800px",
					data: {
						showedSaveOrUpdate: "Update",
						id: editSelectedProduct.id,
						name: this.name,
						quantity: this.quantity,
						price: this.price,
					},
				})

				dialogRef.afterClosed().subscribe((result: Product) => {
					if (result == undefined) {
						console.debug("You cannot add null object on table")
						this.name = ""
						this.quantity = 0
						this.price = 0.0
						return
					}
					this.productService.updateProduct(result).subscribe(
						(response: Product) => {
							if (response.id === null) {
								this.openDialog(
									response.name + " already exists in products list.",
								)
								return
							}
							this.getProducts()
							this.name = ""
							this.quantity = 0
							this.price = 0.0
						},
						(error: HttpErrorResponse) => {
							alert(error.message)
						},
					)
				})
			},
			(error: HttpErrorResponse) => {
				alert(error.message)
			},
		)
	}
}
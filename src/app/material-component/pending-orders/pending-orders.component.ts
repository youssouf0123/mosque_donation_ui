import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { Product } from "../../model/product.interface"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { AddProductComponent } from "../add-product/add-product.component"
import { MatDialog } from "@angular/material/dialog"
import { ProductService } from "../../services/product.service"
import {
	HttpErrorResponse,
	HttpRequest,
	HttpResponse,
} from "@angular/common/http"
import { ConfirmDeleteProductComponent } from "../confirm-delete-product/confirm-delete-product.component"
import { OrderService } from "src/app/services/order.service"
import { Order } from "src/app/model/order.interface"
import { ProductInfosComponent } from "../product-infos/product-infos.component"
import { Router } from "@angular/router"

@Component({
	selector: "app-pending-orders",
	templateUrl: "./pending-orders.component.html",
	styleUrls: ["./pending-orders.component.css"],
})
export class PendingOrdersComponent implements AfterViewInit, OnInit {
	displayedColumns: string[] = [
		"orderId",
		"orderDate",
		"firstName",
		"lastName",
		"phone",
		"status",
		"edit",
		"view",
		"print_confirm",
		"delete",
	]
	name: string | undefined
	quantity: number = 0
	price: number = 0.0

	@ViewChild(MatPaginator) paginator!: MatPaginator

	@ViewChild(MatSort) prdTbSort = new MatSort()

	dataSource = new MatTableDataSource<Order>()

	public orders: Order[] = this.dataSource.data

	orderId: number
	customerFirstName: string
	customerLastName: string
	customerPhoneNum: number
	customerAddress: string
	customerCity: string
	customerCountry: string
	amount: number
	invoiceDOCX: ArrayBuffer
	invoicePDF: ArrayBuffer
	orderDate: string
	status: string
	deleteItemName: string = "Product"

	constructor(
		public dialog: MatDialog,
		private orderService: OrderService,
		private _router: Router,
	) {}

	ngOnInit() {
		this.getAllPendingOrders()
	}

	ngAfterViewInit() {
		// this.dataSource = new MatTableDataSource<Product>( this.products );
		this.dataSource.paginator = this.paginator
		this.dataSource.sort = this.prdTbSort
	}

	public getAllPendingOrders(): void {
		this.orderService.getAllPendingOrders().subscribe(
			(response: Order[]) => {
				this.dataSource.data = response as Order[]
			},
			(error: HttpErrorResponse) => {
				alert("YOussouf " + error.message)
			},
		)
	}

	filterProductTable(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase()
	}

	viewOrder(orderId: number) {
		this.orderService.getPdf(orderId).subscribe((response) => {
			var file = new Blob([response], { type: "application/pdf" })
			var fileURL = URL.createObjectURL(file)
			window.open(fileURL)
		})
	}

	printOrderById(orderId: number) {
		this._router.navigateByUrl("/orders-history")
		this.orderService.printOrderById(orderId).subscribe(
			(product: Product) => {
				if (product != null) {
					this.name = product.name
					this.quantity = product.quantity
					this.price = product.price
					const dialogRef = this.dialog.open(ProductInfosComponent, {
						width: "800px",
						data: {
							name: this.name,
							quantity: this.quantity,
							price: this.price,
						},
					})
				}

				this.getAllPendingOrders()
			},
			(error: HttpErrorResponse) => {
				alert("Youssouf " + error.message)
			},
		)
	}

	// addProduct()
	// {

	//   const dialogRef = this.dialog.open( AddProductComponent, {
	//     width: '800px',
	//     data: {
	//       showedSaveOrUpdate: 'Save',
	//       name: this.name, quantity: this.quantity, price: this.price
	//   },
	//   } );

	//   dialogRef.afterClosed().subscribe( (result: Product) =>
	//   {
	//     if ( result == undefined )
	//     {
	//       console.log( "You cannot add null object on table" );
	//       this.name = "";
	//       this.quantity = 0;
	//       this.price = 0.0;
	//       return;
	//     }
	//     result.price = result.price;
	//     this.productService.addProduct( result ).subscribe(
	//       ( response: Product ) =>
	//       {
	//         // this.products.push( response );
	//         this.getProducts();
	//       },
	//       ( error: HttpErrorResponse ) => { alert( error.message ) }
	//     );
	//   } );
	// }

	// editRow(row: any) {
	//   if (row.id === 0) {
	//     this.userService.addUser(row).subscribe(res => {
	//       row.id = res.id;
	//       row.isEdit = false;
	//     });
	//   } else {
	//     this.userService.updateUser(row).subscribe(() => row.isEdit = false);
	//   }
	// }

	// addRow() {
	//   const newRow: User = {id: 0, name: "", email: "", phone: "", isEdit: true, isSelected: false}
	//   this.dataSource.data = [newRow, ...this.dataSource.data];
	// }

	// removeRow(id: any) {
	//   this.userService.deleteUser(id).subscribe(() => {
	//     this.dataSource.data = this.dataSource.data.filter((u: User) => u.id !== id);
	//   });
	// }

	// removeSelectedRows() {
	//   const users= this.dataSource.data.filter((u: User) => u.isSelected);
	//   this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(confirm => {
	//     if (confirm) {
	//       this.userService.deleteUsers(users).subscribe(() => {
	//         this.dataSource.data = this.dataSource.data.filter((u: User) => !u.isSelected);
	//       });
	//     }
	//   });
	// }

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
					this.orderService.deleteOrder(id).subscribe(() => {
						this.dataSource.data = this.dataSource.data.filter(
							(p: Order) => p.id != id,
						)
					})
				}
			})
	}

	editOrder(item: any) {
		this._router.navigateByUrl("/shopping-home", { state: item })

		// this.orderService.getOrderById( id ).subscribe( ( editSelectedProduct ) =>
		// {
		//   this.name = editSelectedProduct.name;
		//   this.quantity = editSelectedProduct.quantity;
		//   this.price = editSelectedProduct.price;
		//   const dialogRef = this.dialog.open( AddProductComponent, {
		//   width: '800px',
		//     data: {
		//     showedSaveOrUpdate: 'Update',
		//     id: editSelectedProduct.id, name: this.name,
		//      quantity: this.quantity, price: this.price
		// },
		// } );
		// dialogRef.afterClosed().subscribe( (result: Product) =>
		// {
		//   if ( result == undefined )
		//   {
		//     console.log( "You cannot add null object on table" );
		//     this.name = "";
		//     this.quantity = 0;
		//     this.price = 0.0;
		//     return;
		//   }
		//   result.price = result.price;
		//   this.productService.updateProduct( result ).subscribe(
		//     ( response: Product ) =>
		//     {
		//       this.getProducts();
		//       this.name = "";
		//       this.quantity = 0;
		//       this.price = 0.0;
		//     },
		//     ( error: HttpErrorResponse ) => { alert( error.message ) }
		//   );
		// } );
		// },
		//   ( error: HttpErrorResponse ) =>
		//   {
		//     alert( error.message )
		//   } );
	}
}

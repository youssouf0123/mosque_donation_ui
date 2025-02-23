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
import { Order } from "src/app/model/order.interface"
import { OrderService } from "src/app/services/order.service"

@Component({
	selector: "app-orders-history",
	templateUrl: "./orders-history.component.html",
	styleUrls: ["./orders-history.component.scss"],
})
export class OrdersHistoryComponent implements AfterViewInit, OnInit {
	displayedColumns: string[] = [
		"orderId",
		"orderDate",
		"firstName",
		"lastName",
		"phone",
		"status",
		"amount",
		"view",
		"print_confirm",
	]

	@ViewChild(MatPaginator) paginator!: MatPaginator

	@ViewChild(MatSort) prdTbSort = new MatSort()

	dataSource = new MatTableDataSource<Order>()

	public orders: Order[] = this.dataSource.data

	orderId: number
	customerFirstName: string
	customerLastName: string
	customerPhoneNumber: number
	customerAddress: string
	customerCity: string
	customerCountry: string
	invoiceDOCX: ArrayBuffer
	invoicePDF: ArrayBuffer
	orderDate: string
	status: string
	amount: number
	deleteItemName: string = "Product"
	searchType: string[] = ["Date", "Range of Date", "Order ID"]
	selected: string = "Order ID"
	dateLabel: string
	orderIdToSearch: number = 0
	toSearch: string
	fromSearch: string
	constructor(public dialog: MatDialog, private orderService: OrderService) {}

	ngOnInit() {
		this.getAllConfirmedOrders()
		this.getSelectedValue()
	}

	ngAfterViewInit() {
		// this.dataSource = new MatTableDataSource<Product>( this.products );
		this.dataSource.paginator = this.paginator
		this.dataSource.sort = this.prdTbSort
	}

	public getAllConfirmedOrders(): void {
		this.orderService.getAllConfirmedOrders().subscribe(
			(response: Order[]) => {
				this.dataSource.data = response as Order[]
				this.orders = response
			},
			(error: HttpErrorResponse) => {
				alert("YOussouf " + error.message)
			},
		)
	}

	searchOrder() {
		// const d = new Date(this.fromSearch)
		// console.log(d.getDate())
		if (
			this.selected === "Order ID" &&
			this.orderIdToSearch != null &&
			this.orderIdToSearch > 0
		) {
			this.dataSource.data = this.dataSource.data.filter(
				(p: Order) => p.id == this.orderIdToSearch,
			)
		} else if (this.selected === "Date" && this.fromSearch != null) {
			const d = new Date(this.fromSearch)
			console.log("d : " + d)
			const date =
				d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
			this.orderService.getOrdersByDate(date).subscribe((orders: Order[]) => {
				console.log(orders)
				this.dataSource.data = orders
			})
		} else if (
			this.selected === "Range of Date" &&
			this.fromSearch != null &&
			this.toSearch != null
		) {
			const d1 = new Date(this.fromSearch)
			const d2 = new Date(this.toSearch)
			console.log("d1 : " + d1)
			console.log("d2 : " + d2)
			const from =
				d1.getFullYear() + "-" + (d1.getMonth() + 1) + "-" + d1.getDate()
			const to =
				d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + d2.getDate()
			this.orderService
				.getOrderByDateRange(from, to)
				.subscribe((orders: Order[]) => {
					console.log(orders)
					this.dataSource.data = orders
				})
		}
	}
	restoreOrderTable() {
		if (this.selected === "Order ID" && !this.orderIdToSearch) {
			this.dataSource.data = this.orders
		} else if (this.selected == "Date" && !this.fromSearch) {
			this.dataSource.data = this.orders
		} else if (
			this.selected == "Range of Date" &&
			!this.fromSearch &&
			!this.toSearch
		) {
			// this.getAllConfirmedOrders()
			this.dataSource.data = this.orders
		}
	}
	getSelectedValue() {
		var from = document.getElementById("from")
		var to = document.getElementById("to")
		var orderID = document.getElementById("orderID")
		if (this.selected === "Date") {
			this.dataSource.data = this.orders
			this.dateLabel = "Choose a Date"
			this.fromSearch = null
			this.toSearch = null
			this.orderIdToSearch = 0
			from.style.display = "block"
			orderID.style.display = "none"
			to.style.display = "none"
		} else if (this.selected === "Order ID") {
			this.dataSource.data = this.orders
			this.fromSearch = null
			this.toSearch = null
			this.orderIdToSearch = 0
			orderID.style.display = "block"
			from.style.display = "none"
			to.style.display = "none"
		} else {
			this.dataSource.data = this.orders
			this.fromSearch = null
			this.toSearch = null
			this.orderIdToSearch = 0
			this.dateLabel = "From"
			orderID.style.display = "none"
			from.style.display = "block"
			to.style.display = "block"
		}
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

	printOrder(orderId: number) {
		this.orderService.printOrder(orderId).subscribe(
			(order: Order) => {
				if (order == null) {
					//It did not find any printer
				}
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

	editOrder(id: number) {
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

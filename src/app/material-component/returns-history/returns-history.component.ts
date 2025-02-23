import { Component, OnInit, ViewChild } from "@angular/core"
import { MatTableDataSource } from "@angular/material/table"
import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatDialog } from "@angular/material/dialog"
import {
	HttpErrorResponse,
} from "@angular/common/http"
import { ReturnService } from "../../services/return.service"
import { Order } from "src/app/model/order.interface"
import { Router } from '@angular/router';

@Component({
	selector: 'app-returns-history',
	templateUrl: './returns-history.component.html',
	styleUrls: ['./returns-history.component.css']
})
export class ReturnsHistoryComponent implements OnInit {

	displayedColumns: string[] = [
		"orderId",
		"returnDate",
		"amount",
		"lastName",
		"phone",
		"view"
	]
	name: string | undefined
	quantity: number = 0
	price: number = 0.0

	@ViewChild(MatPaginator) paginator!: MatPaginator

	@ViewChild(MatSort) prdTbSort = new MatSort()

	dataSource = new MatTableDataSource<Order>()

	public orders: Order[] = this.dataSource.data

	constructor(
		public dialog: MatDialog,
		private returnService: ReturnService,		
		private _router: Router
	) { }

	ngOnInit() {
		this.getAllReturns()
	}

	ngAfterViewInit() {
		// this.dataSource = new MatTableDataSource<Product>( this.products );
		this.dataSource.paginator = this.paginator
		this.dataSource.sort = this.prdTbSort
	}

	public getAllReturns(): void {
		
		this.returnService.getAllReturns().subscribe(
			(response: any[]) => {
				console.debug(response);
				this.dataSource.data = response;
//				this.dataSource.data = response as Order[];
			},
			(error: HttpErrorResponse) => {
				console.error(error.message);
			},
		)
	}

	filterProductTable(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase()
	}

	viewOrder(returnId: number) {
		this.returnService.getPdf(returnId).subscribe((response) => {
			var file = new Blob([response], { type: "application/pdf" })
			var fileURL = URL.createObjectURL(file)
			window.open(fileURL)
		})
	}
}
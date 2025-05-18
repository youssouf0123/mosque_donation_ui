import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProductService } from "../../services/product.service"

import {
	HttpErrorResponse,
} from "@angular/common/http"

import { MatPaginator } from "@angular/material/paginator"
import { MatSort } from "@angular/material/sort"
import { MatDialog } from "@angular/material/dialog"
import { MatTableDataSource } from "@angular/material/table"

import { Donation } from 'src/app/model/donation.interface';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = [
    "type",
    "quantity"
  ]
  name: string | undefined
  quantity: number = 0
  price: number = 0.0

  @ViewChild(MatPaginator) paginator!: MatPaginator

  @ViewChild(MatSort) prdTbSort = new MatSort()

  dataSource = new MatTableDataSource<any>()

  public products: any[] = this.dataSource.data

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
    private productService: ProductService,
    private _router: Router,
  ) { }

  ngOnInit() {
    this.getProductQuantityAndType()
  }

  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource<Product>( this.products );
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.prdTbSort
  }

  public getProductQuantityAndType(): void {
    this.productService.getProductQuantityAndType().subscribe(
      (response: any) => {

        this.dataSource.data = response as any[]

      },
      (error: HttpErrorResponse) => {
        alert("Youssouf " + error.message)
      },
    )
  }

  filterProductTable(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  removeSelectedRows(id: number) {
    this.dialog
      .open(ConfirmDeleteComponent, {
        data: {
          deleteItemName: this.deleteItemName,
        },
      })

      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.productService.deleteProduct(id).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(
              (p: Donation) => p.id != id,
            )
          })
        }
      })
  }

  editOrder(item: any) {
    this._router.navigateByUrl("/shopping-home", { state: item })
  }

}
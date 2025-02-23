import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../model/product.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddProductComponent } from '../add-product/add-product.component';
import {MatDialog} from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDeleteProductComponent } from '../confirm-delete-product/confirm-delete-product.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'quantity', 'unitPrice','totalPrice', 'delete', 'update'];

  @ViewChild( MatPaginator ) paginator!: MatPaginator;
  
  @ViewChild( MatSort ) prdTbSort = new MatSort();
  
  dataSource = new MatTableDataSource<Product>();
  
  public products: Product[] = this.dataSource.data;
    
  name: string | undefined;
  quantity: number = 0;
  unitPrice: number = 0.0;
  price: number = 0.0;
  deleteItemName: string = 'Product';
    
  constructor(public dialog: MatDialog, private productService: ProductService) {}
    
  ngOnInit ()
  {
    this.getProducts();
  }
  
  ngAfterViewInit ()
  {
    // this.dataSource = new MatTableDataSource<Product>( this.products );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.prdTbSort;
  }
  
  public getProducts (): void
  {
    
    this.productService.getProducts().subscribe(
      ( response: Product[] ) =>
      {
        this.dataSource.data = response as Product[];
      },
      ( error: HttpErrorResponse ) => { alert( error.message ) }
    );
  }
 
  filterProductTable (filterValue: string)
  {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  addProduct()
  {
    
    const dialogRef = this.dialog.open( AddProductComponent, {
      width: '800px',
      data: {
        showedSaveOrUpdate: 'Save',
        name: this.name, quantity: this.quantity,
        unitPrice: this.unitPrice, price: this.price
    },
    } );

    dialogRef.afterClosed().subscribe( (result: Product) =>
    {
      if ( result == undefined )
      {
        console.log( "You cannot add null object on table" );
        this.name = "";
        this.quantity = 0;
        this.unitPrice = 0.0;
        this.price = 0.0;
        return;
      }
      result.price = result.price;
      this.productService.addProduct( result ).subscribe(
        ( response: Product ) =>
        {
          // this.products.push( response );
          this.getProducts();
        },
        ( error: HttpErrorResponse ) => { alert( error.message ) }
      );
    } );
  }


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

  removeSelectedRows ( id: number )
  {
    this.dialog.open( ConfirmDeleteProductComponent, {
      data: {
        deleteItemName: this.deleteItemName
      }
    })
      
      .afterClosed().subscribe( confirm =>
    {
      if ( confirm )
      {
        this.productService.deleteProduct( id ).subscribe(
        () =>
        {
          this.dataSource.data = this.dataSource.data.filter( ( p: Product ) => p.id != id );
        }
      );
      }
    } );
  }

  editProduct ( id: number )
  {
    this.productService.getProductById( id ).subscribe( ( editSelectedProduct ) =>
    {
      this.name = editSelectedProduct.name;
      this.quantity = editSelectedProduct.quantity;
      this.unitPrice = editSelectedProduct.unitPrice;
      this.price = editSelectedProduct.price;
      
      const dialogRef = this.dialog.open( AddProductComponent, {
      width: '800px',
        data: {
        showedSaveOrUpdate: 'Update',
        id: editSelectedProduct.id, name: this.name,
         quantity: this.quantity, unitPrice: this.unitPrice, price: this.price
    },
    } );

    dialogRef.afterClosed().subscribe( (result: Product) =>
    {
      if ( result == undefined )
      {
        console.log( "You cannot add null object on table" );
        this.name = "";
        this.quantity = 0;
        this.unitPrice = 0.0;
        this.price = 0.0;
        return;
      }
      result.price = result.price;
      this.productService.updateProduct( result ).subscribe(
        ( response: Product ) =>
        {
          this.getProducts();
          this.name = "";
          this.quantity = 0;
          this.unitPrice = 0.0;
          this.price = 0.0;
        },
        ( error: HttpErrorResponse ) => { alert( error.message ) }
      );
    } );

    },
      ( error: HttpErrorResponse ) =>
      {
        alert( error.message )
      } );
      
  }


}

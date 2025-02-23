import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicule } from 'src/app/model/vehicule.interface';
import { ProductService } from 'src/app/services/product.service';
import { VehiculeService } from 'src/app/services/vehicule.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { AddVehiculeComponent } from '../add-vehicule/add-vehicule.component';
import { ConfirmDeleteProductComponent } from '../confirm-delete-product/confirm-delete-product.component';

@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.scss']
})
export class VehiculesComponent {
  displayedColumns: string[] = ['id', 'licensePlate', 'make', 'model', 'custName', 'delete', 'update', 'add'];
  @ViewChild( MatPaginator )
  paginator!: MatPaginator;
  @ViewChild( MatSort ) prdTbSort = new MatSort();
  dataSource = new MatTableDataSource<Vehicule>();
  public vehicules: Vehicule[] = this.dataSource.data;
    
  licensePlate: string = "";
  make: string = "";
  model: string = "";
  vin: string = '';
  bodyType: string = "0";
  deleteItemName: string = 'Vehicule';
  vehicleData: any;
  
  constructor(public dialog: MatDialog, private vehiculeService: VehiculeService) {}
    
  ngOnInit ()
  {
    this.getVehicules();
  }
  
  ngAfterViewInit ()
  {
    // this.dataSource = new MatTableDataSource<Vehicule>( this.vehicules );
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.prdTbSort;
  }
  
  public getVehicules (): void
  {
    
    this.vehiculeService.getVehicules().subscribe(
      ( response: any ) =>
      {
        console.log( response );
        this.dataSource.data = response;
      },
      ( error: HttpErrorResponse ) => { alert( error.message ) }
    );
  }
 
  filterVehiculeTable (filterValue: string)
  {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  addVehicule(veh: Vehicule)
  {
    console.log( veh );
    const dialogRef = this.dialog.open( AddVehiculeComponent, {
      width: '800px',
      data: {
        showedSaveOrUpdate: "Save", custFirstName: veh.custFirstName,
        licensePlate: this.licensePlate, make: this.make,
        model: this.model, vin: this.vin, bodyType: this.bodyType
    },
    } );
    
    dialogRef.afterClosed().subscribe( (result: Vehicule) =>
    {
      if ( result == undefined )
      {
        console.log( "You cannot add null object on table" );
        this.licensePlate = "";
        this.make = "";
        this.model = "";
        this.vin = "";
        this.bodyType = "";
        return;
      }
       this.vehicleData =  { licensePlate: result.licensePlate,
        make: result.make, model: result.model, vin: result.vin, bodyType: result.bodyType,
        customer: {id: veh.custId, firstName: '', lastName: '',
        phoneNum: '', emailAddress: ''}
      };
      this.vehiculeService.addVehicule( this.vehicleData ).subscribe(
        ( response: any ) =>
        {
          // this.vehicules.push( response );
          this.getVehicules();
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
    this.dialog.open( ConfirmDeleteProductComponent , {
      data: {
        deleteItemName: this.deleteItemName
      }
    }).afterClosed().subscribe( confirm =>
    {
      if ( confirm )
      {
        this.vehiculeService.deleteVehicule( id ).subscribe(
        () =>
        {
          this.dataSource.data = this.dataSource.data.filter( ( p: Vehicule ) => p.id != id );
        }
      );
      }
    } );
  }

  editVehicule ( id: number )
  {
    this.vehiculeService.getVehiculeById( id ).subscribe( ( editSelectedVehicule ) =>
    {
      this.licensePlate = editSelectedVehicule.licensePlate;
      this.make = editSelectedVehicule.make;
      this.model = editSelectedVehicule.model;
      this.vin = editSelectedVehicule.vin;
      this.bodyType = editSelectedVehicule.bodyType;
      
      const dialogRef = this.dialog.open( AddVehiculeComponent, {
      width: '800px',
        data: {
        showedSaveOrUpdate: "Update", custFirstName: editSelectedVehicule.custFirstName,
        id: editSelectedVehicule.id, licensePlate: this.licensePlate, make: this.make,
        model: this.model, vin: this.vin, bodyType: this.bodyType, 
    },
    } );

    dialogRef.afterClosed().subscribe( (result: any) =>
    {
      if ( result == undefined )
      {
        console.log( "You cannot add null object on table" );
        this.licensePlate = "";
        this.make = "";
        this.model = "";
        this.vin = "";
        this.bodyType = "";
        return;
      }
      this.vehicleData =  {  id: result.id, licensePlate: result.licensePlate,
        make: result.make, model: result.model, vin: result.vin, bodyType: result.bodyType,
        customer: {id: editSelectedVehicule.custId, firstName: '', lastName: '',
        phoneNum: '', emailAddress: ''}
      };
      this.vehiculeService.updateVehicule( this.vehicleData ).subscribe(
        ( response: any ) =>
        {
          this.getVehicules();
          this.licensePlate = "";
          this.make = "";
          this.model = "";
          this.vin = "";
          this.bodyType = "";
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



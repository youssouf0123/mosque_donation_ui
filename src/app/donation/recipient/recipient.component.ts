import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { AddDialogComponent } from './dialogs/add/add.dialog.component';
import { EditDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.dialog.component';

import { fromEvent } from 'rxjs';
// import { Donation } from 'src/app/model/donation.interface';

import { ChangeDetectorRef } from '@angular/core';
import { RecipientDataService } from 'src/app/services/recipient.data.service';
import { Recipient } from 'src/app/model/recipient.interface';
import { RecipientDataSource } from './recipient.data.source';

// FOLLOWING THIS TUTORIAL: https://stackblitz.com/edit/angular-material-table-crud?file=src%2Fapp%2Fapp.component.ts

@Component({
  selector: 'manage-donation',
  templateUrl: './recipient.component.html',
  styleUrls: ['./recipient.component.css']
})
export class RecipientComponent implements OnInit {

  displayedColumns = ['id', 'firstName', 'lastName', 'dateOfBirth', 'gender', 'phoneNumber', 'status', 'actions'];

  dataSource: RecipientDataSource | null;
  index: number;
  id: number;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public recipientDataService: RecipientDataService,
    private cdRef: ChangeDetectorRef
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  ngAfterViewInit() {
    this.cdRef.detectChanges(); // Force update so Angular is happy
  }

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addNew(recipient: Recipient) {

    const dialogRef = this.dialog.open(AddDialogComponent, {
      data: { recipient: recipient }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.recipientDataService.dataChange.value.push(this.recipientDataService.getDialogData());
        this.refreshTable();
      }

    });

  }

  startEdit(
    i: number, 
    id: number, 
    firstName: string, 
    lastName: string, 
    dateOfBirth: string, 
    gender: string, 
    phoneNumber: string, 
    status: string
  ) {

    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { id: id, firstName: firstName, lastName: lastName, dateOfBirth: dateOfBirth, gender: gender, phoneNumber: phoneNumber, status: status }
    });

    dialogRef.afterClosed().subscribe(result => { // triggered because of [mat-dialog-close]="1" on the close button

      if (result === 1) {

        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.recipientDataService.dataChange.value.findIndex(x => x.id === this.id);

        // console.debug('foundIndex => ' + foundIndex);
        // console.debug(this.dataService.dataChange.value[foundIndex]);

        // Then you update that record using data from dialogData (values you entered)
        this.recipientDataService.dataChange.value[foundIndex] = this.recipientDataService.getDialogData(); // this is updating with -1 index value!

        // And lastly refresh table
        this.refreshTable();
      }

    });

  }

  deleteItem(
    i: number, 
    id: number, 
    firstName: string, 
    lastName: string, 
    dateOfBirth: string, 
    gender: string, 
    phoneNumber: string, 
    status: string
  ) {

    this.index = i;
    this.id = id;

    console.debug(firstName + ', ' + lastName);
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id: id, firstName: firstName, lastName: lastName, dateOfBirth: dateOfBirth, gender: gender, phoneNumber: phoneNumber, status: status }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {
        const foundIndex = this.recipientDataService.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.recipientDataService.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }

    });

  }

  private refreshTable() {
    // Refreshing table using paginator
    // Thanks yeager-j for tips
    // https://github.com/marinantonio/angular-mat-table-crud/issues/12
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  /*   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
    // OLD METHOD:
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }*/

  public loadData() {

    this.dataSource = new RecipientDataSource(this.recipientDataService, this.paginator, this.sort);

    fromEvent(this.filter.nativeElement, 'keyup')
      // .debounceTime(150)
      // .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}
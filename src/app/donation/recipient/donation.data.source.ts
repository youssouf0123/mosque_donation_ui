import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipient } from 'src/app/model/recipient.interface';
import { RecipientDataService } from 'src/app/services/recipient.data.service';

export class DonationDataSource extends DataSource<Recipient> {

  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Recipient[] = [];
  renderedData: Recipient[] = [];

  constructor(
    public _dataService: RecipientDataService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Recipient[]> {

    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._dataService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._dataService.getAllDonations();

    return merge(...displayDataChanges).pipe(map(() => {

        // Filter data
        this.filteredData = this._dataService.data.slice().filter((donation: Recipient) => {
          const searchStr = (donation.id + donation.firstName + donation.lastName + donation.dateOfBirth + donation.gender).toLowerCase() + donation.phoneNumber + donation.status.toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }

    ));

  }

  disconnect() { }

  /** Returns a sorted copy of the database data. */
  sortData(data: Recipient[]): Recipient[] {

    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {

      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'firstName': [propertyA, propertyB] = [a.firstName, b.firstName]; break;
        case 'lastName': [propertyA, propertyB] = [a.lastName, b.lastName]; break;
        
        // todo: number field
        // case 'dateOfBirth': [propertyA, propertyB] = [a.dateOfBirth, b.dateOfBirth]; break;

        case 'gender': [propertyA, propertyB] = [a.gender, b.gender]; break;
        case 'phoneNumber': [propertyA, propertyB] = [a.phoneNumber, b.phoneNumber]; break;
        case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });

  }

}